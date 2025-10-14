---
date: 2025-10-25
title: "Backend Performance"
tags: [backend, performance, scaling]
image: /og/backend-performance.png
category: tech
description: "A no-nonsense backend performance playbook: find bottlenecks, fix the worst first, and build systems that stay fast under real load."
---

Performance is a product feature. Users don’t care about theoretical throughput—they care that actions feel instant and reliable. This checklist turns vague advice into a repeatable process you can run every quarter to keep your backend fast as it grows.

## Table of Contents

1. [Mindset and Method](#mindset-and-method)
2. [Database Hotspots](#database-hotspots)
3. [Network and I/O](#network-and-io)
4. [CPU and Concurrency](#cpu-and-concurrency)
5. [Caching that Works](#caching-that-works)
6. [Queues and Asynchrony](#queues-and-asynchrony)
7. [Observability as Guardrails](#observability-as-guardrails)
8. [Capacity and Load](#capacity-and-load)
9. [Common Pitfalls](#common-pitfalls)
10. [Quarterly Tune-Up Checklist](#quarterly-tune-up-checklist)

## Mindset and Method

- **Measure, don’t guess**: Profile real requests in production-like conditions
- **Fix the worst first**: Top 1–2 bottlenecks usually unlock the most wins
- **Make it repeatable**: Same steps, same dashboards, same reports
- **Protect regressions**: Alerts and SLOs catch backslides early

## Database Hotspots

- **N+1 queries**: Batch, prefetch, or join appropriately
- **Slow joins**: Check join strategy, cardinality, and relevant indexes
- **Missing/unused indexes**: Add what’s needed; remove what hurts writes
- **Hot rows/locks**: Reduce contention with finer-grained updates
- **Large result sets**: Paginate, stream, or limit columns

## Network and I/O

- **Chatty services**: Collapse round-trips; send fewer, richer calls
- **Payload bloat**: Trim fields; compress where sensible
- **Connection reuse**: Keep-alives and connection pools
- **External dependencies**: Timeouts, retries, and circuit breakers
- **Static assets**: Push to CDNs; don’t serve from app nodes

## CPU and Concurrency

- **Hot loops**: Replace wasteful work; move repeated computation upstream
- **Contention**: Reduce shared state; prefer immutability where possible
- **Parallelism**: Use worker pools thoughtfully; avoid oversubscription
- **Serialization costs**: Choose efficient formats for hot paths
- **Garbage pressure**: Reduce short‑lived allocations in tight loops

## Caching that Works

- **What to cache**: Expensive, frequently read, slowly changing data
- **Where to cache**: In‑process for speed; shared cache for consistency
- **Keys and invalidation**: Deterministic keys; explicit invalidation on writes
- **Stale‑while‑revalidate**: Serve fast; refresh in background
- **Cache observation**: Hit rate, evictions, memory, tail latencies

## Queues and Asynchrony

- **Move non‑critical work off the request path**
- **Idempotency**: Make operations safe to retry
- **Back‑pressure**: Don’t accept more than you can process
- **Ordering**: Ensure tasks that must serialize do so explicitly
- **DLQs and retries**: Visibility into failed work and bounded retries

## Observability as Guardrails

- **Golden signals**: Latency, traffic, errors, saturation
- **Top endpoints**: Watch the 10 most critical journeys
- **Red/USE methods**: Simple, repeatable service health views
- **Tracing**: See where time is spent across boundaries
- **SLOs/SLAs**: Define and monitor promises to users

## Capacity and Load

- **Load tests**: Use realistic data, mixes, and think time
- **Headroom**: Keep 30–50% for spikes and failures
- **Rollouts**: Gradual rollouts with canaries and metrics
- **Scaling plan**: Know when to scale up, out, or re‑architect
- **Cost guardrails**: Watch performance per dollar

## Common Pitfalls

- **Optimizing the wrong thing**: Measure first; don’t polish cold paths
- **Premature optimization**: Keep it simple until data says otherwise
- **Hidden dependencies**: Third‑party slowness is your slowness
- **One‑off fixes**: Turn wins into checklists and monitors
- **Ignoring tail latency**: P95/P99 is the user experience

## Quarterly Tune-Up Checklist

- [ ] Identify top 10 endpoints by traffic and revenue impact
- [ ] Profile slowest 2–3 code paths under realistic load
- [ ] Fix the single biggest DB hotspot (index, query, or schema)
- [ ] Reduce cross‑service round‑trips on one critical flow
- [ ] Add or validate cache for one expensive read path
- [ ] Review timeouts/retries for external dependencies
- [ ] Add tracing to one opaque path and publish findings
- [ ] Re‑run load tests and update capacity plan

Performance is a practice. Do the simple things consistently and you’ll stay fast long after novelty architectures have slowed themselves down.