---
title: Binäre Suche
kind: exercise
---

Vervollständige die Funktion **search(list, x)**: `list` ist aufsteigend sortiert. Gib die Position (Index, ab 0) von `x` in `list` zurück, oder `-1`, wenn `x` nicht vorkommt.

Jedes Element anzuschauen ist zu langsam: Halbiere in jedem Schritt den Bereich, der noch übrig ist. Die Lösung muss **O(log n)** sein.
