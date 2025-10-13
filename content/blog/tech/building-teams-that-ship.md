---
date: 2025-10-10
title: Building Teams That Ship
tags: [engineering, management]
image: /og/teams-ship.png
---

Shipping is not a heroic act. It is the predictable outcome of a team that has removed friction from decision‑making, execution, and learning. The best teams do not “work harder”; they design their environment so that shipping becomes the path of least resistance.

## The core idea: reduce drag, not add power
Most organizations try to add power: more people, more meetings, more process. What actually works is removing drag. Drag shows up as unclear ownership, slow decisions, and work that sits waiting for review.

### A simple operating system
1) Defaults for common decisions. When in doubt, prefer small PRs, feature flags, and gradual rollouts. If you have defaults, you avoid bikeshedding.

2) Write before you build. One‑page design docs clarify the problem, options, and the decision. The goal is not consensus; it’s shared understanding.

3) Measure flow, not effort. Track cycle time from “work started” to “in production.” If you optimize this loop, quality and morale follow.

## Reviews that move work forward
Reviews should raise the quality bar without stopping the line. Use a two‑pass approach:

- Pass 1: Safety and scope. Is the change minimal, reversible, and behind a flag?
- Pass 2: Taste and consistency. Names, intent, and fit with the codebase.

If feedback requires a redesign, pause and move to a short design doc. Don’t litigate architecture in a PR comment thread.

## Handoffs and ownership
The worst delays happen at invisible borders—between product and engineering, frontend and backend, “my part” and “your part.” Replace handoffs with ownership of outcomes. One owner is accountable for the end‑to‑end result and orchestrates the contributors.

## Rituals that actually help
- Monday: 30‑minute planning with clear, small bets.
- Daily: 10‑minute flow review (what’s stuck, why, who unblocks it today).
- Friday: ship review. Celebrate shipped work, note one improvement to the loop.

## A short checklist
- Is the next step small and obvious?
- Is the decision recorded (doc or commit) and reversible?
- Is someone accountable for the outcome, not just the task?

Shipping is a habit. Build the system that makes the right move the easy move.

## How to apply
- This week: measure baseline cycle time and review wait time.
- Next: introduce a 10‑minute daily flow review to unblock work.
- Then: write a one‑page template and require it for non‑trivial changes.



