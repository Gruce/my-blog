---
date: 2025-09-27
title: "Safe Migrations"
tags: [migrations, data, reliability]
image: /og/migrations.png
category: tech
description: "Migrations are product changes. Backfill first, dual‑write when needed, switch reads last—and rehearse with prod‑like data."
---

Migrations change user experience as much as schema. Treat them like product launches: plan, stage, measure, and roll back safely.

## Table of Contents

1. [Mindset](#mindset)
2. [Plan the Sequence](#plan-the-sequence)
3. [Backfills that Survive](#backfills-that-survive)
4. [Dual‑Write Patterns](#dual-write-patterns)
5. [Switch Reads Last](#switch-reads-last)
6. [Verification and Rollback](#verification-and-rollback)
7. [Runbook Checklist](#runbook-checklist)

## Mindset

Migrations are product changes. Communicate timelines, risks, and rollback plans. Owners are explicit.

## Plan the Sequence

Order matters: write path safety first, read path last. Use flags and staged rollouts.

## Backfills that Survive

Backfill first with resumable jobs: id ranges, offsets, or timestamps. Make them idempotent and restartable.

## Dual‑Write Patterns

When schemas diverge, dual‑write temporarily. Log divergences and alert on drift.

## Switch Reads Last

After data is backfilled and dual‑writes are clean, move reads to the new shape. Start with a canary and ramp.

## Verification and Rollback

Compare old vs new outputs, latency, and error rates. Keep rollback switches warm until confidence is high.

## Runbook Checklist

- Backfill job plan and rehearse on prod‑like data
- Flag strategy and traffic ramp
- Drift detection and dashboards
- Rollback procedure and owner on call

Rehearse on prod‑like data. Ship like it’s a feature.