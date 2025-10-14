---
date: 2025-08-23
title: "Small Team Design"
tags: [architecture, teams, simplicity]
image: /og/system-design-small.png
category: tech
description: "Design for the team you have. Fewer owners, limited ops time—choose systems you can fix at 2am."
---

Design for the team you have. The right system is the simplest one your team can operate confidently.

## Table of Contents

1. [Team-First Constraints](#team-first-constraints)
2. [Architecture Principles](#architecture-principles)
3. [Operational Reality](#operational-reality)
4. [Decision Checklist](#decision-checklist)
5. [When to Add Complexity](#when-to-add-complexity)

## Team-First Constraints

- Few owners
- Limited ops time
- Need for speed

## Architecture Principles

- Prefer monoliths with clear modules
- Favor managed services over DIY
- Bias to boring tech your team knows

## Operational Reality

On-call is real. Optimize for observability, clear rollback, and simple deployments. Document “how to fix it at 2am.”

## Decision Checklist

- Who owns it? Who can fix it?
- What’s the rollback plan?
- Does it meet latency/reliability constraints?
- How will we observe it?

## When to Add Complexity

Only when constraints demand it (scale, isolation, compliance). Add one piece at a time and verify value.

Pick the simplest thing that’s easy to fix at 2am.