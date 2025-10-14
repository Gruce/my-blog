---
date: 2025-04-25
title: "Refactor with Flags"
tags: [refactoring, rollout, safety]
image: /og/feature-flags.png
category: tech
description: "Turn risky refactors into safe sequences with feature flags. Gate, compare, roll back—then clean up fast."
---

Flags turn risk into sequence. They let you gate paths, compare behavior, and roll back instantly.

## Table of Contents

1. [Why Flags for Refactors](#why-flags-for-refactors)
2. [Core Patterns](#core-patterns)
3. [Verification Loop](#verification-loop)
4. [Cleanup Discipline](#cleanup-discipline)
5. [Rollout Playbook](#rollout-playbook)

## Why Flags for Refactors

Refactors change shape without changing behavior—until they do. Flags add brakes and steering to the journey.

## Core Patterns

- **Kill switch**: Turn off the new path instantly
- **Dark launch**: Run new path without user impact
- **Shadow compare**: Log old vs. new outputs; alert on drift

## Verification Loop

Measure parity before promotion. Compare outputs, latency, and error profiles. Promote gradually.

## Cleanup Discipline

Flags rot. Schedule removal two releases after full rollout. Track owners and due dates.

## Rollout Playbook

1. Introduce a kill‑switch for the new path
2. Compare old vs. new outputs for one hot endpoint
3. Ramp traffic by cohort/region; monitor
4. Remove the flag and dead code once stable

Refactor safely by sequencing risk—and cleaning up.