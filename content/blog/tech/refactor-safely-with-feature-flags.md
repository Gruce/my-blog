---
date: 2025-08-02
title: Refactor Safely with Feature Flags
tags: [refactoring, rollout]
image: /og/feature-flags.png
---

Flags turn risk into sequence.

## Use flags to
- Gate new paths
- Compare outputs
- Roll back instantly

Delete old flags quickly. They rot.

## How to apply
- Introduce a kill‑switch for the new code path.
- Compare old vs new outputs in logs for one endpoint.
- Schedule a flag cleanup two releases after rollout.


