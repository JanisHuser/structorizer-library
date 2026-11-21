---
title: Binary search
kind: exercise
---

Complete the function **search(list, x)**: `list` is sorted in ascending order. Return the position (index, starting at 0) of `x` in `list`, or `-1` if it is not there.

Looking at every element is too slow: halve the range that is left in every step. The solution has to be **O(log n)**.
