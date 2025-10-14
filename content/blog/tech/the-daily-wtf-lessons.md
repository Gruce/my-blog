---
date: 2025-05-02
title: "Daily WTF Lessons"
tags: [antipatterns, culture, quality]
image: /og/daily-wtf.png
category: tech
description: "Learn from failure shapes: missing ownership, magical globals, and reasonless rewrites. Laugh—then add guardrails."
---

Every failure has a shape. Spot the patterns and install guardrails before they recur.

## Table of Contents

1. [Failure Shapes](#failure-shapes)
2. [Ownership and Edges](#ownership-and-edges)
3. [Global State Smells](#global-state-smells)
4. [Rewrite Discipline](#rewrite-discipline)
5. [Guardrails](#guardrails)

## Failure Shapes

- Decisions without owners
- Hidden coupling behind “simple” changes
- Rewrites that never end

## Ownership and Edges

Add CODEOWNERS to critical paths and make escalation obvious. Document edges and invariants.

## Global State Smells

Replace magical globals with explicit dependencies and clear lifetimes.

## Rewrite Discipline

Write a pre‑mortem before the big change. Define exit criteria and kill switches.

## Guardrails

- Ownership files and service catalogs
- Review checks for new globals and cross‑module imports
- Post‑launch reviews tied to decisions, not blame

Laugh, then build guardrails.