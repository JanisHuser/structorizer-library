#!/usr/bin/env node
'use strict';

/* Checks this library with the Structorizer app's own engine and grader:
   - repository.json and every entry's README (front matter, all languages there are)
   - examples: diagram.struct loads and runs to the end (with `input` / `randoms` from README.md)
   - exercises: tests.json is valid, the model solution gets full marks
   - tools/fixtures/*.json: wrong solutions that must fail in the stated category
   and writes the text-only catalogue README.md.

   node tools/check.js [--app <path or URL of the Structorizer app>] [--no-readme]
   Default app: ../Structorizer (next to this repository). */

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { pathToFileURL, fileURLToPath } = require('url');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const appArg = args.includes('--app') ? args[args.indexOf('--app') + 1] : path.join(ROOT, '..', 'Structorizer');
const writeReadme = !args.includes('--no-readme');
const LANGS = ['en', 'de', 'fr', 'it'];

async function appFile(name) {
  if (/^https?:\/\//.test(appArg)) {
    const res = await fetch(new URL(name, appArg.endsWith('/') ? appArg : `${appArg}/`));
    if (!res.ok) throw new Error(`${res.status} ${name}`);
    return res.text();
  }
  return fs.readFileSync(path.join(appArg, name), 'utf8');
}

async function loadApp() {
  const ctx = vm.createContext({
    console, URL, setTimeout, fetch,
    document: { cookie: '', documentElement: {}, querySelectorAll: () => [] },
  });
  for (const f of ['i18n.js', 'codegen.js', 'engine.js', 'grader.js', 'library.js']) {
    vm.runInContext(await appFile(f), ctx, { filename: f });
  }
  vm.runInContext('lang = "en";', ctx);
  return ctx;
}

const readFile = async (url) => {
  const p = fileURLToPath(url);
  if (!fs.existsSync(p)) throw Object.assign(new Error(`missing ${path.relative(ROOT, p)}`), { status: 404 });
  return fs.readFileSync(p, 'utf8');
};

let failures = 0;
const fail = (where, msg) => { failures++; console.log(`  ✗ ${where}: ${msg}`); };
const ok = (where, msg) => console.log(`  ✓ ${where}${msg ? `: ${msg}` : ''}`);

function summarize(r) {
  const parts = [`${r.score}/${r.max}`];
  if (r.tests) parts.push(`tests ${r.tests.ok}/${r.tests.total}`);
  if (r.complexity) parts.push(`complexity ${r.complexity.measured || r.complexity.error} (≤ ${r.complexity.target}, steps ${r.complexity.steps.join('/')})`);
  if (r.structure) parts.push(`structure ${r.structure.passed ? 'ok' : r.structure.broken.map((b) => `${b.rule} ${b.value}`).join(', ')}`);
  return parts.join(' · ');
}

function failedCategories(r) {
  return ['tests', 'complexity', 'structure'].filter((k) => r[k] && !r[k].passed);
}

(async () => {
  const app = await loadApp();
  const repoUrl = pathToFileURL(path.join(ROOT, 'repository.json')).href;
  const libs = {};
  for (const l of LANGS) libs[l] = await app.loadLibrary(repoUrl, { lang: l, fetchText: readFile });
  const lib = libs.en;
  console.log(`${lib.title} (${lib.id}): ${lib.entries.size} entries`);

  for (const chapter of lib.chapters) {
    console.log(`\n${chapter.title}`);
    for (const entry of chapter.entries) {
      const where = entry.path;
      if (entry.broken) { fail(where, entry.summary); continue; }
      if (!entry.meta.title) fail(where, 'README.md has no title');
      for (const l of LANGS.slice(1)) {
        const p = path.join(ROOT, entry.path, `README.${l}.md`);
        if (fs.existsSync(p) && !app.parseFrontMatter(fs.readFileSync(p, 'utf8')).meta.title) fail(where, `README.${l}.md has no title`);
      }
      try {
        if (entry.kind === 'example') {
          const project = await app.loadEntryProject(lib, entry, 'diagram.struct');
          if (!project) { fail(where, 'diagram.struct missing'); continue; }
          const r = await app.runHeadless(project, { input: entry.meta.input || [], randoms: entry.meta.randoms || [] });
          if (r.error) fail(where, `runs with an error: ${r.error}`);
          else ok(where, `example, ${r.steps} steps`);
        } else {
          const tests = await app.loadEntryTests(lib, entry);
          if (!tests.tests?.length && !tests.complexity && !tests.structure) fail(where, 'tests.json checks nothing');
          const solution = await app.loadEntryProject(lib, entry, 'solution.struct');
          if (!solution) { fail(where, 'solution.struct missing'); continue; }
          const r = await app.grade(solution, tests);
          if (r.passed && r.score === r.max) ok(where, `exercise, solution ${summarize(r)}`);
          else fail(where, `solution does not pass: ${summarize(r)}`);
          const starter = await app.loadEntryProject(lib, entry, 'starter.struct');
          if (starter) {
            const s = await app.grade(starter, tests);
            if (s.passed) fail(where, 'the starter already passes');
          }
        }
      } catch (e) {
        fail(where, e.message);
      }
    }
  }

  // wrong solutions that must fail where they say
  const fixDir = path.join(__dirname, 'fixtures');
  if (fs.existsSync(fixDir)) {
    console.log('\nWrong solutions (must fail)');
    for (const f of fs.readdirSync(fixDir).filter((x) => x.endsWith('.json')).sort()) {
      const fx = JSON.parse(fs.readFileSync(path.join(fixDir, f), 'utf8'));
      const entry = lib.entries.get(fx.entry);
      if (!entry) { fail(f, `no entry ${fx.entry}`); continue; }
      const r = await app.grade(fx.project, await app.loadEntryTests(lib, entry));
      const got = failedCategories(r);
      const want = fx.fails;
      if (r.passed) fail(f, `passes, but should fail ${want.join(', ')}`);
      else if (want.join() !== got.join()) fail(f, `fails ${got.join(', ')}, expected ${want.join(', ')} (${summarize(r)})`);
      else if (fx.measured && r.complexity?.measured !== fx.measured) fail(f, `measured ${r.complexity?.measured}, expected ${fx.measured}`);
      else if (fx.error && !String(r.tests?.visible.find((t) => t.error)?.error || r.complexity?.error || '').includes(fx.error)) fail(f, `expected an error containing "${fx.error}" (${summarize(r)})`);
      else ok(f, `${fx.entry} fails ${got.join(', ')} · ${summarize(r)}`);
    }
  }

  if (writeReadme) {
    const appUrl = 'https://janishuser.github.io/Structorizer/';
    const md = [`# ${lib.title}`, '',
      'Examples and exercises for [Structorizer](https://janishuser.github.io/Structorizer/), the structogram (Nassi-Shneiderman diagram) editor. Exercises are graded automatically in the app: tests, complexity and structure.', '',
      'This file is generated by `node tools/check.js` – edit the entries, not this file.', ''];
    for (const chapter of lib.chapters) {
      md.push(`## ${chapter.title}`, '');
      for (const e of chapter.entries) {
        // our own library is the app's default one; another library adds ?library=<its repository.json>
        const link = `${appUrl}?open=${encodeURIComponent(e.path).replace(/%2F/g, '/')}`;
        md.push(`- **${e.title}** (${e.kind}) – ${e.summary} · [Open in Structorizer](${link}) · [\`${e.path}\`](${e.path})`);
      }
      md.push('');
    }
    md.push('## Format', '',
      '- `repository.json`: `format`, `id`, `title` per language, `chapters` with their `entries` (folder paths), `includes`, `submissions`.',
      '- Every entry is a folder with `README.md` (front matter `title`, `kind: example | exercise`, then the description in Markdown) and optional translations `README.de.md`, `README.fr.md`, `README.it.md`.',
      '- Example: `diagram.struct`, saved from the app. `input` / `randoms` in the front matter let the checker run it.',
      '- Exercise: `tests.json` (tests, complexity, structure, points), `solution.struct`, optional `starter.struct`.', '');
    fs.writeFileSync(path.join(ROOT, 'README.md'), md.join('\n'));
  }

  console.log(failures ? `\n${failures} problem(s)` : '\nAll good.');
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
