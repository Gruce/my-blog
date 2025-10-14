---
date: 2025-03-21
title: "Keep Frontend Simple"
tags: [frontend, simplicity, ux]
image: /og/frontend-simple.png
category: tech
description: "Simplicity scales. Prefer server truth, coarse caches, and clear ownership of state to keep frontends fast and maintainable."
---

Complexity hides in state. The fastest frontends keep state simple, data fresh, and flows obvious.

## Table of Contents

1. [Principles](#principles)
2. [Data Truth and Sources](#data-truth-and-sources)
3. [Caching that Helps UX](#caching-that-helps-ux)
4. [Killing Stale Components](#killing-stale-components)
5. [Ownership of State](#ownership-of-state)
6. [Common Pitfalls](#common-pitfalls)
7. [How to Apply](#how-to-apply)

## Principles

- Prefer server truth over client guesses
- Make loading states graceful, not chatty
- Compose small parts; avoid global magic

## Data Truth and Sources

Trust the server as the source of truth. Minimize derived client state. Recompute on demand rather than syncing across the app.

## Caching that Helps UX

Cache where it removes jank. Stale‑while‑revalidate beats spinners. Coarse caches usually win over fine‑grained hacks.

## Killing Stale Components

Delete components that no longer represent current flows. Fewer paths, fewer bugs, faster iteration.

## Ownership of State

Lift state to the nearest owner. Avoid app‑wide stores unless multiple screens truly share the same source of truth.

## Common Pitfalls

- Over‑optimistic client state that drifts from server truth
- Spinner‑first UX instead of cached-first render
- Global stores for local concerns

## How to Apply

- Remove one global store; lift state to the nearest owner
- Replace a spinner with stale‑while‑revalidate cache
- Delete an unused component each week

Simple wins when change is constant.