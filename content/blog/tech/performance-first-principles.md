---
date: 2025-09-02
title: Performance, First Principles
tags: [performance]
image: /og/performance.png
---

Users don’t perceive milliseconds; they perceive friction. Performance is the craft of removing it. Start with first principles, not micro‑optimizations.

## What makes software feel fast
1) Less to load: send fewer bytes. Image weight and third‑party scripts dominate your budget.

2) Less to wait on: do fewer round trips. Collapse requests, batch work, push data closer to the user.

3) Less to think about: render useful content early. Skeletons are better than spinners; cached results are better than skeletons.

## A practical playbook
- Budget: set a hard cap for JS and images. Enforce in CI.
- Order: prioritize meaningful paint and input readiness.
- Cache: use CDN aggressively; cache at component and query layers.
- Measure: collect real‑user metrics (LCP, INP, TTFB) from devices you don’t own.

## Make performance sustainable
Add performance to the definition of done. Regressions are prevented by budgets and tests, not promises.

Fast software feels simple. That feeling is designed.

## How to apply
- Set a 150KB JS and 300KB images budget; fail CI on regressions.
- Add real‑user monitoring for LCP/INP; fix one top offender.
- Cache the most expensive query at the edge with SWR.


