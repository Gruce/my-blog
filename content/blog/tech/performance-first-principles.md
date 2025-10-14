---
date: 2025-04-23
title: "Performance Principles"
tags: [performance, ux, scaling]
image: /og/performance.png
category: tech
description: "Users perceive friction, not milliseconds. Cut bytes, trips, and thinking—then protect wins with budgets and real‑user data."
---

Users don’t perceive milliseconds; they perceive friction. Performance is the craft of removing it. Start with first principles, not micro‑optimizations.

## Table of Contents

1. [What Feels Fast](#what-feels-fast)
2. [A Practical Playbook](#a-practical-playbook)
3. [Real-User Measurement](#real-user-measurement)
4. [Protecting Gains](#protecting-gains)
5. [Quarterly Tune-Up](#quarterly-tune-up)

## What Feels Fast

1) **Less to load**: Send fewer bytes. Images and third‑party scripts dominate the budget.

2) **Less to wait on**: Do fewer round trips. Collapse requests, batch work, push data closer to users.

3) **Less to think about**: Render useful content early. Skeletons beat spinners; cached results beat skeletons.

## A Practical Playbook

- **Budget**: Hard caps for JS and images; enforce in CI
- **Order**: Prioritize meaningful paint and input readiness
- **Cache**: CDN aggressively; cache at component and query layers
- **Defer**: Push non‑critical work off the critical path

## Real-User Measurement

Collect LCP, INP, and TTFB from devices you don’t own. Track tail latencies (P95/P99) on the golden paths.

## Protecting Gains

Add performance to the definition of done. Regressions are prevented by budgets, alerts, and tests—not promises.

## Quarterly Tune-Up

- Set 150KB JS and 300KB image budgets; fail CI on regressions
- Add RUM for LCP/INP; fix one top offender
- Cache the most expensive query closer to users

Fast software feels simple. That feeling is designed.