---
date: 2025-03-13
title: "Design Docs"
tags: [architecture, docs, decisions]
image: /og/design-docs.png
category: tech
description: "Short, decisive design docs that reduce uncertainty and align teams. Write them just in time, keep them living, and close the loop."
---

Design docs reduce uncertainty before we spend expensive engineering time. They are not essays; they are decision tools. The best ones are short, opinionated, and written just in time.

## Table of Contents

1. [When to Write](#when-to-write)
2. [A Four-Part Outline](#a-four-part-outline)
3. [Make Review Easy](#make-review-easy)
4. [Keep It Living](#keep-it-living)
5. [Close the Loop](#close-the-loop)
6. [Team Rituals](#team-rituals)
7. [Anti-Patterns](#anti-patterns)

## When to Write

Write a doc when the decision is hard to reverse, coordination spans multiple people, or the cost of a wrong turn is high. If you can revert in an hour, write a good commit message instead.

## A Four-Part Outline

1) **Problem**: What outcome is missing? Who is affected? How will we measure success?

2) **Options**: Two to three viable paths with trade‑offs. Avoid strawmen. Include “do nothing.”

3) **Decision**: The chosen path and why it wins for now. Capture constraints (budget, latency, team skills).

4) **Risks and mitigations**: What could go wrong and what we’ll do about it (flags, canaries, rollbacks).

## Make Review Easy

Lead with an executive summary (five sentences or fewer). Link to a prototype or spike if you have one. Ask for specific feedback: “Are we comfortable with eventual consistency in this path?”

## Keep It Living

Update the doc during rollout as reality teaches you. Keep decisions, metrics, and deviations current.

## Close the Loop

When the system settles, close with an ADR or a post‑launch note. Let the doc fade so the code is the source of truth.

## Team Rituals

- **Templates**: One‑pager with Problem/Options/Decision/Risks
- **Review**: 30‑minute read‑review with targeted feedback questions
- **Archive**: ADRs indexed by system and theme for future reference

## Anti-Patterns

- **Essays**: Long prose without crisp decisions
- **Too early**: Writing before we know the problem
- **Too late**: Writing after implementation
- **Unowned**: No single owner responsible for the decision

Design docs are for decisions. Everything else belongs in code and tests.