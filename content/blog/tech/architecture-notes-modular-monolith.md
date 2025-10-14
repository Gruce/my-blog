---
date: 2025-07-15
title: "Modular Monolith"
tags: [architecture, monolith, modular]
image: /og/modular-monolith.png
category: tech
description: "A practical guide to building a modular monolith: clear boundaries, explicit interfaces, and a migration path that scales without premature microservices."
---

Most systems start as monoliths. Good ones become modular. The modular monolith offers a pragmatic middle path: a single deployable unit with clear internal boundaries, explicit contracts, and independent evolution of domains—without the operational overhead of distributed systems.

This guide shows how to design, grow, and maintain a modular monolith that scales with your product and team. No hype, no premature microservices—just structure, discipline, and clarity.

## Table of Contents

1. [Why Modular Monoliths Work](#why-modular-monoliths-work)
2. [Defining Strong Boundaries](#defining-strong-boundaries)
3. [Module Anatomy](#module-anatomy)
4. [Communication and Contracts](#communication-and-contracts)
5. [Data Ownership and Access](#data-ownership-and-access)
6. [Coupling, Cohesion, and Change](#coupling-cohesion-and-change)
7. [Operational Discipline](#operational-discipline)
8. [When to Split (and When Not To)](#when-to-split-and-when-not-to)
9. [Migration Playbook](#migration-playbook)
10. [Common Pitfalls](#common-pitfalls)
11. [Checklists and Practices](#checklists-and-practices)

## Why Modular Monoliths Work

- **Speed with safety**: One deployable artifact, fast local dev, easy end‑to‑end testing
- **Clear boundaries**: Structure the system around business domains, not layers
- **Evolvable design**: Modules can change independently behind stable interfaces
- **Operational simplicity**: Avoid early network/distribution complexity

## Defining Strong Boundaries

Boundaries are your first architecture decision.
- **Domain-first**: Organize around business capabilities (e.g., Billing, Catalog, Identity)
- **Encapsulation**: Hide internal types and logic; export only what clients need
- **No cross-reach**: Modules don’t poke into each other’s internals—ever
- **Explicit access**: Interaction happens via narrow, documented contracts

## Module Anatomy

Each module should be self-contained with:
- **Public API**: The only entry points consumers can call
- **Internal Logic**: Use cases, policies, validations, mappers
- **Data Layer**: Persistence that belongs to the module
- **Events**: Outbox of domain events the module publishes
- **Configuration**: Module-scoped config, feature flags, and defaults

## Communication and Contracts

Prefer simple, explicit contracts.
- **Synchronous calls** only through the public API
- **Asynchronous collaboration** via domain events when decoupling is needed
- **Versioning** of contracts to evolve without breaking consumers
- **Documentation** that explains intent, invariants, and error cases

## Data Ownership and Access

- **Owned data**: Each module owns its tables/collections and enforces invariants
- **Read models**: Other modules read via APIs, views, or replicated projections
- **No shared write access**: Cross-module writes violate ownership and invariants
- **Migrations**: Owned by the module; coordinated through release notes

## Coupling, Cohesion, and Change

Design for change where change actually happens.
- **High cohesion**: Related policies and behaviors live together
- **Low coupling**: Minimize knowledge of other modules’ internals
- **Change heatmaps**: Track files that change together to reveal hidden seams
- **Churn-based refactors**: Move code to reduce cross-module edits

## Operational Discipline

- **Testing strategy**: Heavy module-level tests; a few end‑to‑end smoke paths
- **Release notes**: Record interface changes per module
- **Observability**: Logs, metrics, and traces tagged by module/domain
- **Ownership**: Clear owners for each module; docs live with the code

## When to Split (and When Not To)

Split when the seams are obvious, not when it’s trendy.
- **Split when**: A module has independent scaling needs, isolated failure domains, or different release cadences
- **Don’t split because**: “Microservices are cool,” a blog post said so, or to fix team communication
- **Preconditions to split**: Stable contracts, low coupling, clear ownership, observability in place

## Migration Playbook

When a split becomes necessary:
1. Harden interfaces and remove accidental dependencies
2. Externalize data access behind the module’s API
3. Introduce async events for decoupled workflows
4. Shadow the module as a separate process while calls still use in‑process API
5. Flip traffic gradually; monitor, compare, and validate behavior
6. Retire the in‑process module only when confidence is high

## Common Pitfalls

- **Leaky boundaries**: Importing internals “just this once” becomes forever
- **Shared database tables**: The fastest way to erase ownership and invariants
- **God modules**: Bloated “core” that everything depends on
- **Layered coupling**: UI → Service → Repo repeating across domains instead of domain‑centric design
- **Premature microservices**: Trading code complexity for operational complexity

## Checklists and Practices

- **Boundary Checklist**: Clear owners, explicit API, hidden internals, documented invariants
- **Dependency Hygiene**: Lint or reviews to block cross-module imports
- **Change Review**: Reject PRs that add cross‑module knowledge without contracts
- **Observability**: Per‑module metrics (latency, errors, throughput) and change logs
- **Readme per Module**: Purpose, API, data ownership, events, maintainers

A modular monolith is not a halfway house; it’s an intentional architecture. Get the boundaries right, keep contracts tight, and let the code reveal when it’s time to split.