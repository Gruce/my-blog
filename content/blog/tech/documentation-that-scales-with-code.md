---
date: 2025-06-11
title: "Docs that Scale"
tags: [docs, maintenance, teams]
image: /og/docs-scale.png
category: tech
description: "Documentation that stays fresh: keep it close to decisions, structure it for change, and make the next edit obvious."
---

Documentation rots when it lives far from decisions. Keep docs where work happens, tie them to real changes, and structure them so updating is the easy path.

## Table of Contents

1. [Principles](#principles)
2. [Close to the Code](#close-to-the-code)
3. [Decision Records](#decision-records)
4. [Living READMEs](#living-readmes)
5. [Examples over Prose](#examples-over-prose)
6. [Review and Ownership](#review-and-ownership)
7. [Anti-Patterns](#anti-patterns)

## Principles

- **Proximity**: Docs sit next to the systems they describe
- **Specificity**: Document decisions and interfaces, not opinions
- **Replaceable**: Easy to change beats perfectly written
- **Searchable**: Names, headings, and links that are easy to find

## Close to the Code

Put module docs in the module. Keep setup, usage, and gotchas in the same repo as the code. Avoid external wikis that drift.

## Decision Records

Use lightweight ADRs for irreversible choices. Capture context, options, decision, and consequences. Link ADRs from the code they affect.

## Living READMEs

Each module gets a README with: purpose, public API, data ownership, dependency boundaries, and maintainers. Keep change logs nearby.

## Examples over Prose

Prefer minimal, concrete examples to walls of text. Show inputs/outputs and typical usage. Keep examples updated in the same PR as changes.

## Review and Ownership

Docs change with code. Review them together. Assign ownership so someone is responsible for freshness.

## Anti-Patterns

- **Orphaned wikis**: Docs that no one updates
- **Essay docs**: Long prose with no actionable information
- **Global READMEs**: One giant file that says everything and nothing

Make the next change obvious. When docs live where decisions happen, they stay useful.