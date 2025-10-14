---
date: 2025-04-04
title: "Designing with Constraints"
tags: [design, product, systems]
image: /og/constraints.png
category: tech
description: "Constraints focus teams. Use budget, latency, and simplicity to choose the smallest system that works—and keep it evolvable."
---

Good design starts with limits. Constraints sharpen decisions, prevent over‑engineering, and help teams converge on solutions that actually ship.

## Table of Contents

1. [Why Constraints Win](#why-constraints-win)
2. [Choosing the Right Constraints](#choosing-the-right-constraints)
3. [The Constraint Stack](#the-constraint-stack)
4. [Decision Framework](#decision-framework)
5. [Smallest System That Works](#smallest-system-that-works)
6. [Running with Constraints](#running-with-constraints)
7. [Common Traps](#common-traps)

## Why Constraints Win

- **Focus**: Reduce options to raise decision quality
- **Speed**: Faster alignment and execution
- **Quality**: Fewer moving parts, fewer failure modes
- **Evolvability**: Room to grow without rewrites

## Choosing the Right Constraints

Pick a small set that matters for this problem:
- **Budget**: Cost to build and run
- **Latency**: User‑perceived speed for key actions
- **Reliability**: Error budgets and uptime targets
- **Simplicity**: Operational and cognitive load
- **Team skills**: Build within current strengths

## The Constraint Stack

Order constraints and respect them:
1. User experience guardrails
2. Reliability and safety
3. Performance targets
4. Cost ceilings
5. Implementation preferences

## Decision Framework

For each option:
- Does it meet the top constraints without heroics?
- What complexity does it add today and tomorrow?
- What’s the rollback if we’re wrong?

## Smallest System That Works

Prefer the simplest architecture that meets constraints with margin. Add complexity only when a real constraint demands it.

## Running with Constraints

- **Constraint reviews**: Re‑state constraints at kickoff and major checkpoints
- **Flags and rollouts**: Buy optionality when uncertainty is high
- **Metrics**: Track user‑visible outcomes tied to constraints
- **Scope management**: Cut scope before you add systems

## Common Traps

- **Vague constraints**: “Fast” and “cheap” are not actionable
- **Too many constraints**: Everything matters → nothing matters
- **Constraint drift**: Decisions ignore the original guardrails
- **Premature complexity**: Over‑solving imaginary problems

Start with limits. Choose the smallest system that works. Earn your complexity.