---
date: 2025-07-15
title: "Modular Monolith"
tags: [architecture, monolith, modular]
category: tech
description: "Most systems start as monoliths. Good ones become modular. A practical guide to building a modular monolith that scales with your product and team."
sitemap:
  loc: /architecture-notes-modular-monolith
  lastmod: 2025-07-15
  changefreq: monthly
  priority: 0.8
---

Most systems start as monoliths. Good ones become modular. The modular monolith offers a pragmatic middle path: a single deployable unit with clear internal boundaries, explicit contracts, and independent evolution of domains—without the operational overhead of distributed systems.

## Why Modular Monoliths Work

Modular monoliths work because they provide:

- **Clear boundaries**: Modules have clear boundaries and explicit contracts.

- **Independent evolution**: Modules can evolve independently without affecting others.

- **Simpler operations**: Single deployable unit means simpler deployment and operations.

- **Better performance**: No network calls between modules means better performance.

- **Easier testing**: Easier to test than distributed systems.

## Defining Strong Boundaries

Strong boundaries are the foundation of a modular monolith. Each module should:

- Have a clear purpose
- Have explicit interfaces
- Own its data
- Be independently testable

The key is to make boundaries explicit and enforce them through code structure, not just documentation.

## Module Anatomy

A well-designed module has:

- **Public API**: Clear interface that other modules can use.

- **Internal implementation**: Implementation details that are hidden from other modules.

- **Data ownership**: Owns its data and provides access through its API.

- **Tests**: Comprehensive tests that verify its behavior.

## Communication and Contracts

Modules communicate through explicit contracts. These contracts define:

- What data is exchanged
- What operations are available
- What errors can occur
- What guarantees are provided

The key is to make contracts explicit and stable. Changes to contracts should be intentional and well-communicated.

## Data Ownership and Access

Each module should own its data. Other modules should access this data through the module's API, not directly.

This provides:

- **Encapsulation**: Implementation details are hidden.

- **Flexibility**: Modules can change their internal structure without affecting others.

- **Consistency**: All access goes through the same interface, ensuring consistency.

## When to Split

Split a module into a separate service when:

- **Different scaling needs**: Module needs to scale independently.

- **Different deployment cadence**: Module needs to be deployed independently.

- **Different technology stack**: Module needs different technology.

- **Team boundaries**: Module is owned by a different team.

Don't split prematurely. Start with a modular monolith and split when you have a clear reason.

## The Principle

Modular monoliths provide clear boundaries, independent evolution, and simpler operations without the overhead of distributed systems. Define strong boundaries, make contracts explicit, and own data within modules. Split to microservices only when you have a clear reason. Start simple, add structure as needed.
