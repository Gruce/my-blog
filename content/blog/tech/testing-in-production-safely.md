---
date: 2025-03-19
title: "Testing in Prod"
tags: [testing, rollout, safety]
image: /og/testing-in-prod.png
category: tech
description: "Prod parity is an ideal; prod safety is a practice. Use flags, shadow traffic, and gradual rollouts—observe first, then scale."
---

Prod parity is an ideal; prod safety is a practice. You reduce risk by sequencing and observing changes in real environments.

## Table of Contents

1. [Safety Principles](#safety-principles)
2. [Core Tools](#core-tools)
3. [Rollout Strategy](#rollout-strategy)
4. [Observability First](#observability-first)
5. [Common Pitfalls](#common-pitfalls)

## Safety Principles

- Reversible changes
- Limited blast radius
- Observability before exposure

## Core Tools

- **Feature flags**: Gate behavior and enable instant rollback
- **Shadow traffic**: Compare outputs without user impact
- **Gradual rollouts**: Ramp by cohort or region with guardrails

## Rollout Strategy

Start with dark launches and shadow comparisons. Ramp carefully, watch tail latency and error budgets, and hold a kill switch.

## Observability First

Instrument before exposure. Define success metrics ahead of time and publish a dashboard for reviewers.

## Common Pitfalls

- Testing without kill switches
- No parity on monitoring
- Shipping to everyone at once

Observe first, then scale.