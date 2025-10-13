---
date: 2025-09-18
title: "Architecture Notes: The Modular Monolith"
tags: [architecture]
image: /og/modular-monolith.png
---

Most systems start as monoliths. Good ones become modular.

## Do
- Clear domain boundaries
- Internal packages
- Explicit interfaces

Split when the seams are obvious, not when it’s trendy.

## How to apply
- Draw domain boundaries; create packages per domain.
- Hide internals; expose a thin module API.
- Track coupling; split when cross‑module churn spikes.


