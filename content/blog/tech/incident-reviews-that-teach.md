---
date: 2025-02-13
title: "Incident Reviews"
tags: [reliability, incidents, process]
image: /og/incidents.png
category: tech
description: "Turn incidents into lasting improvements. A blameless, systematic review process that makes learning the deliverable."
---

Incidents are the most expensive lessons you’ll ever get for free. A good review turns pain into practice and leaves the system stronger than before.

## Table of Contents

1. [What Blameless Means](#what-blameless-means)
2. [The Review Process](#the-review-process)
3. [A Short Template](#a-short-template)
4. [Common Pitfalls](#common-pitfalls)
5. [Follow-Through](#follow-through)

## What Blameless Means

Blameless is not causeless. We examine context and systems, not personal failings. Ask what made the error easy, not who made it.

## The Review Process

1) **Timeline reconstruction** using facts (logs, alerts, dashboards). Avoid hindsight bias: record what was knowable at the time.

2) **Decision and signal analysis**. What cues were missed? What playbooks were missing? Where did tooling slow us down?

3) **Systemic fixes**. Prefer changes to alerts, runbooks, dashboards, and guardrails over “be more careful.”

## A Short Template

- Summary and impact
- Timeline of events
- Contributing factors (technical and organizational)
- Actions (prevention and detection)

## Common Pitfalls

- **Blame hunting**: Focus on people over systems
- **Endless debates**: No owner, no decision, no change
- **Action theater**: Tasks that don’t change real behavior
- **No verification**: Actions checked off but not measured

## Follow-Through

- Schedule the review within 72 hours; cap at 60 minutes
- Record facts first, then analysis; assign 3 systemic actions
- Revisit actions in 30 days; verify changes actually landed

Make learning the deliverable. Then verify it landed.