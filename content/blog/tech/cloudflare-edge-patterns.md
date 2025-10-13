---
date: 2025-08-09
title: Cloudflare Edge Patterns
tags: [edge, performance]
image: /og/cloudflare-edge.png
---

Put logic closer to users.

## Patterns
- Cache html, not just assets
- KV for config, D1 for data
- Durable Objects for coordination

Latency is a feature.

## How to apply
- Move one hot path to the edge behind a flag.
- Cache HTML for anonymous traffic with short TTL + SWR.
- Log cache hit ratios and iterate on keys/headers.


