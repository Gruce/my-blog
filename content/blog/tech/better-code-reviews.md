---
date: 2025-07-20
title: "Better Code Reviews"
tags: [process, reviews, collaboration]
image: /og/code-reviews.png
category: tech
description: "Make code reviews faster, kinder, and more effective. A practical guide for authors and reviewers to improve quality without slowing teams down."
---

Code reviews shape code and culture. Done well, they raise the quality bar, spread knowledge, and keep teams moving. Done poorly, they stall work and create needless friction. This guide makes reviews fast, kind, and effective.

## Table of Contents

1. [What Good Looks Like](#what-good-looks-like)
2. [Author Responsibilities](#author-responsibilities)
3. [Reviewer Responsibilities](#reviewer-responsibilities)
4. [Two-Pass Review System](#two-pass-review-system)
5. [Right-Sizing Pull Requests](#right-sizing-pull-requests)
6. [Checklists that Catch Issues](#checklists-that-catch-issues)
7. [Communication and Tone](#communication-and-tone)
8. [Async vs. Sync Reviews](#async-vs-sync-reviews)
9. [Metrics and Continuous Improvement](#metrics-and-continuous-improvement)
10. [Common Anti-Patterns](#common-anti-patterns)

## What Good Looks Like

- **Clear intent**: The title and description explain the goal
- **Single purpose**: One intent per PR; follow-ups for extras
- **Small size**: Prefer narrow, reviewable changes
- **Tests and docs**: Changes are verifiable and explained
- **Fast feedback**: Reviews happen within agreed SLAs

## Author Responsibilities

- **Prepare the diff**: Keep PRs focused and under 300 lines when possible
- **Explain context**: What problem, what options, and why this one
- **Call out risks**: Migrations, data changes, and rollback plans
- **Guide the review**: Areas to focus on; what’s out of scope
- **Be responsive**: Address feedback quickly and follow up with improvements

## Reviewer Responsibilities

- **Move work forward**: Aim to approve with small, local suggestions
- **Focus on impact**: Safety, correctness, and user experience
- **Prioritize clarity**: Naming, intent, and readability
- **Ask before advising**: One clarifying question before a rewrite
- **Be consistent**: Apply team conventions fairly and predictably

## Two-Pass Review System

- **Pass 1: Safety and Scope**
  - Minimal change for the goal?
  - Reversible or behind a flag?
  - Tests for critical paths?
- **Pass 2: Taste and Consistency**
  - Names, intent, and readability
  - Fit with existing patterns and architecture
  - Documentation and examples updated

## Right-Sizing Pull Requests

- **Slice vertically**: Deliver thin end‑to‑end value when possible
- **Separate refactors**: Don’t mix features and structural changes
- **Stage risky work**: Feature flags and incremental rollouts
- **Batch small fixes**: Avoid review overhead for trivial changes

## Checklists that Catch Issues

- **Scope**: One intent? Clear boundaries and success criteria
- **Safety**: Rollback plan, flags, migrations, monitoring
- **Correctness**: Tests cover core behavior and edge cases
- **Quality**: Clear names, cohesive functions, no dead code
- **Docs**: Readme/changelogs updated where needed

## Communication and Tone

- **Be kind**: Critique code, not people
- **Be specific**: Point to lines and explain why
- **Be brief**: Avoid essays; suggest concrete changes
- **Assume good intent**: Treat feedback as collaboration
- **Close the loop**: Say what changed based on feedback

## Async vs. Sync Reviews

- **Async first**: Fast, low‑friction default
- **Sync when needed**: Complex changes, disagreements, or teaching moments
- **Office hours**: Scheduled time for quick pairing and walkthroughs
- **SLAs**: Agree on response times to keep work flowing

## Metrics and Continuous Improvement

- **Cycle time**: Open → merged duration
- **Review time**: Time waiting for first and final reviews
- **Rework rate**: Number of follow‑up changes post‑merge
- **Incident links**: Post‑mortems tied to review gaps
- **Team health**: Survey review quality and psychological safety

## Common Anti-Patterns

- **Drive‑by nitpicks**: Style comments without substance
- **Architecture by PR**: Debating design in comment threads
- **Mega‑PRs**: 1,000+ line diffs that no one can review well
- **Vague approvals**: “LGTM” without understanding changes
- **Unbounded bikeshedding**: Endless debates without decisions

Great reviews are about momentum and mastery. Keep PRs small, make feedback specific, and focus on moving valuable work forward—together.