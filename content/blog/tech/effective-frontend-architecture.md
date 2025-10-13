---
date: 2025-08-23
title: Effective Frontend Architecture
tags: [frontend, architecture]
image: /og/frontend-architecture.png
---

Frontend architecture is the art of managing state, data, and time without leaking that complexity to the user. The goal is not a perfect abstraction; it is a system that stays understandable as it grows.

## A mental model
Every screen does three things: fetch data, represent state, and respond to user intent. Make each explicit. Hidden work becomes hidden bugs.

## Practical patterns
- Co‑locate: keep data fetching and derived state near the component that renders it. Globalize only when multiple screens need the same source of truth.
- Contract first: treat API shapes as interfaces. Type them, mock them, fail loudly when they drift.
- Cache where it matters: cache queries that block interaction. Stale‑while‑revalidate beats spinners.

## Avoid accidental complexity
Prefer simple, predictable state over clever reducers and magic effects. If a newcomer can’t trace the flow in five minutes, it will not survive a rewrite.

Good frontend architecture makes tomorrow’s change obvious.

## How to apply
- Move one query to a typed client and co‑locate it with its view.
- Add request/response types to your API boundary; fail builds on drift.
- Cache one blocking query with SWR and remove a spinner.


