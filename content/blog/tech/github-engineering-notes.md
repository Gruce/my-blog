---
date: 2025-09-22
title: "GitHub Notes"
tags: [github, tooling, scale]
image: /og/github-notes.png
category: tech
description: "Practical lessons inspired by GitHub engineering: design for defaults, optimize the golden path, and make migrations boring."
---

Shipping for millions means designing for defaults. The most reliable systems make the right thing easy, the risky thing rare, and the unsafe thing impossible.

## Table of Contents

1. [Design for Defaults](#design-for-defaults)
2. [The Golden Path](#the-golden-path)
3. [Boring Migrations](#boring-migrations)
4. [Docs as Product](#docs-as-product)
5. [Guardrails over Gates](#guardrails-over-gates)
6. [Operational Clarity](#operational-clarity)
7. [Signals and Metrics](#signals-and-metrics)

## Design for Defaults

Most users follow defaults. Invest heavily there. Safe settings, sensible timeouts, and clear limits prevent whole classes of incidents.

## The Golden Path

Document and support one blessed way to build, test, and deploy. Make it fast. Everything else is an escape hatch with friction.

## Boring Migrations

Great migrations feel uneventful. Use flags, shadow traffic, and phased rollouts. Announce timelines, publish checklists, and verify with data.

## Docs as Product

Treat docs like code: versioned, reviewed, and owned. Optimize onboarding docs and the five tasks teams perform most often.

## Guardrails over Gates

Prefer automatic checks, linters, and templates to human gates. Catch issues early; keep humans focused on judgment calls.

## Operational Clarity

Name services, owners, and runbooks clearly. Make the rollback obvious. Practice handoffs with real pages, not theory.

## Signals and Metrics

Watch user‑visible signals: latency, errors, and task success on the golden paths. Internal metrics matter only insofar as they improve those.

Scale follows clarity. Make the path clear, the defaults excellent, and the migrations boring.