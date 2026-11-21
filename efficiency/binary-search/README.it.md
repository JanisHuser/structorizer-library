---
title: Ricerca binaria
kind: exercise
---

Completa la funzione **search(list, x)**: `list` è ordinata in modo crescente. Restituisci la posizione (indice, da 0) di `x` in `list`, oppure `-1` se non c'è.

Guardare ogni elemento è troppo lento: dimezza a ogni passo l'intervallo rimasto. La soluzione deve essere **O(log n)**.
