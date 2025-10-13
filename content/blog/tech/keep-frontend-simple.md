---
date: 2025-07-22
title: Keep the Frontend Simple
tags: [frontend, simplicity]
image: /og/frontend-simple.png
---

Complexity hides in state.

## Tips
- Prefer server data over client guessing
- Coarse caches beat fine-grained hacks
- Kill stale components

Simple wins when change is constant.

## How to apply
- Remove one global store; lift state to the nearest owner.
- Replace a spinner with stale‑while‑revalidate cache.
- Delete an unused component each week.


