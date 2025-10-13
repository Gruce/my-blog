---
date: 2025-07-26
title: Running Safe Migrations
tags: [databases, reliability]
image: /og/migrations.png
---

Migrations are product changes.

## Steps
- Backfill first
- Dual-write if needed
- Switch reads last

Rehearse on prod-like data.

## How to apply
- Create a backfill job that can resume from offsets.
- Dual‑write reads behind a feature flag.
- Use a canary table and switch traffic gradually.


