---
title: Recherche dichotomique
kind: exercise
---

Complète la fonction **search(list, x)** : `list` est triée par ordre croissant. Renvoie la position (indice, à partir de 0) de `x` dans `list`, ou `-1` s'il n'y est pas.

Regarder chaque élément est trop lent : divise par deux la plage restante à chaque étape. La solution doit être en **O(log n)**.
