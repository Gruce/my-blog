---
date: 2025-10-07
title: "Observability Kit"
tags: [observability, reliability, metrics]
image: /og/observability.png
category: tech
description: "See systems like users do. Start with RED/USE, structured logs, and traces; alert on symptoms, not guesses."
---

Observability is about answering unknown questions quickly. Start simple, tie signals to user impact, and make the next fix obvious.

## Table of Contents

1. [Signals that Matter](#signals-that-matter)
2. [Metrics: RED + USE](#metrics-red--use)
3. [Logs that Tell Stories](#logs-that-tell-stories)
4. [Tracing Critical Flows](#tracing-critical-flows)
5. [Alerting on Symptoms](#alerting-on-symptoms)
6. [Dashboards for Decisions](#dashboards-for-decisions)
7. [First 30 Days Plan](#first-30-days-plan)

## Signals that Matter

Watch what users feel: latency, errors, and saturation on the golden paths.

## Metrics: RED + USE

- **RED** (Rate, Errors, Duration) for services
- **USE** (Utilization, Saturation, Errors) for resources
- Add SLOs that reflect user promises

## Logs that Tell Stories

Use structured logs with consistent keys. Log decisions and identifiers, not just failures.

## Tracing Critical Flows

Trace the hottest user journeys end‑to‑end. Sample enough to spot outliers and tail latency.

## Alerting on Symptoms

Alert on burn rate and user‑visible errors—not CPU spikes. Keep alerts actionable and few.

## Dashboards for Decisions

One per golden path: status, recent incidents, and links to runbooks. Fewer, better dashboards beat many noisy ones.

## First 30 Days Plan

- Add RED metrics to one service
- Trace your hottest flow
- Replace a noisy alert with an SLO and burn rate policy

See the system like a user. Measure what matters, and make action the default.