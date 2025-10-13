---
date: 2025-10-05
title: Design Docs That Work
tags: [architecture, docs]
image: /og/design-docs.png
---

Design docs exist to reduce uncertainty before we spend expensive engineering time. They are not essays; they are decision tools. The best ones are short, opinionated, and written just in time.

## When to write a doc
Write a doc when the decision is hard to reverse, coordination spans multiple people, or the cost of a wrong turn is high. If you can revert in an hour, write a good commit message instead.

## A four‑part outline
1) Problem: what outcome are we missing? Who is affected? How will we know it worked?

2) Options: two to three viable paths with trade‑offs. Avoid strawmen. Include “do nothing.”

3) Decision: the chosen path and why it wins for now. Capture the constraints that influenced it (budget, latency, team skills).

4) Risks and mitigations: what could go wrong and what we’ll do about it (flags, canaries, rollbacks).

## Make it easy to review
Lead with an executive summary (five sentences or fewer). Link to a prototype or spike if you have one. Ask for specific feedback: “Are we comfortable with eventual consistency in this path?”

## Keep it living, then let it die
Update the doc during rollout as reality teaches you. When the system settles, close the loop with an ADR or a post‑launch note. Let the doc fade so the code is the source of truth.

Design docs are for decisions. Everything else belongs in code and tests.

## How to apply
- Create a 1‑page design doc template with Problem/Options/Decision/Risks.
- Write one doc for your next irreversible change; ask for targeted feedback.
- Close the loop with an ADR after rollout.


