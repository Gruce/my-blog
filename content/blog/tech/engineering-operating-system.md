---
date: 2025-05-30
title: "Engineering Operating System"
tags: [engineering, teams, development]
category: tech
description: "Master the engineering operating system that transforms chaotic development into predictable shipping. Learn the frameworks, metrics, and practices that turn engineering teams into high-performance machines."
sitemap:
  loc: /engineering-operating-system
  lastmod: 2025-05-30
  changefreq: monthly
  priority: 0.8
---

The difference between great engineering teams and mediocre ones isn't talent—it's systems. While most organizations respond to shipping delays with more meetings, more process, and more people, the most effective teams focus on something entirely different: reducing drag.

After building and scaling engineering teams at multiple companies, I've learned that shipping isn't heroism. It's the predictable outcome of a well-designed engineering operating system that eliminates friction, accelerates decision-making, and creates sustainable momentum.

This comprehensive guide distills years of experience into actionable frameworks, real-world examples, and proven practices that transform how engineering teams operate. Whether you're leading a startup's first engineering hire or managing a 100-person engineering organization, these principles will help you build systems that ship consistently.

## Table of Contents

1. [The Foundation: Why Engineering Operating Systems Matter](#the-foundation-why-engineering-operating-systems-matter)
2. [Core Principles of High-Performance Engineering Teams](#core-principles-of-high-performance-engineering-teams)
3. [The Engineering Operating System Framework](#the-engineering-operating-system-framework)
4. [Decision-Making Systems That Scale](#decision-making-systems-that-scale)
5. [Code Review and Quality Assurance](#code-review-and-quality-assurance)
6. [Ownership and Accountability Models](#ownership-and-accountability-models)
7. [Rituals and Ceremonies That Compound](#rituals-and-ceremonies-that-compound)
8. [Metrics and Measurement Systems](#metrics-and-measurement-systems)
9. [Tooling and Automation Infrastructure](#tooling-and-automation-infrastructure)
10. [Documentation and Knowledge Management](#documentation-and-knowledge-management)
11. [Team Onboarding and Scaling](#team-onboarding-and-scaling)
12. [Common Anti-Patterns and How to Avoid Them](#common-anti-patterns-and-how-to-avoid-them)
13. [Implementation Roadmap](#implementation-roadmap)
14. [Future-Proofing Your Engineering OS](#future-proofing-your-engineering-os)

## The Foundation: Why Engineering Operating Systems Matter

### The Shipping Crisis in Modern Engineering

Most engineering teams face the same fundamental problem: they can't ship predictably. Features that should take days stretch into weeks. Simple bug fixes become multi-day investigations. New team members take months to become productive. The result is a constant cycle of heroics, burnout, and missed deadlines.

The root cause isn't lack of talent or insufficient resources—it's lack of systems. Without a coherent operating system, teams default to ad-hoc processes that create friction at every step.

### What Makes an Engineering Operating System Different

An engineering operating system isn't just a collection of tools or processes. It's a coherent framework that:

- **Reduces cognitive load** by providing clear defaults for common decisions
- **Eliminates handoffs** by establishing clear ownership boundaries
- **Accelerates learning** through systematic feedback loops
- **Scales with the team** without requiring constant process changes

### The Business Impact of Predictable Shipping

Teams with effective engineering operating systems don't just ship faster—they ship better. They have:

- **50-70% faster cycle times** from idea to production
- **80% fewer production incidents** due to systematic quality gates
- **3x faster onboarding** of new team members
- **90% reduction in context switching** through clear ownership models

## Core Principles of High-Performance Engineering Teams

### 1. Reduce Drag, Not Add Power

Most organizations respond to slowdowns by adding more: more meetings, more process, more people, more tools. This approach adds power but rarely removes drag. The most effective teams focus on eliminating friction.

**The Drag Reduction Framework:**

```typescript
interface DragPoint {
  type: 'decision' | 'handoff' | 'review' | 'context-switch';
  impact: 'high' | 'medium' | 'low';
  frequency: number; // per week
  effort: number; // hours per occurrence
}

class DragAnalyzer {
  calculateDragScore(dragPoints: DragPoint[]): number {
    return dragPoints.reduce((score, point) => {
      const impactMultiplier = point.impact === 'high' ? 3 : point.impact === 'medium' ? 2 : 1;
      return score + (point.frequency * point.effort * impactMultiplier);
    }, 0);
  }
  
  prioritizeDragReduction(dragPoints: DragPoint[]): DragPoint[] {
    return dragPoints
      .map(point => ({
        ...point,
        score: this.calculateDragScore([point])
      }))
      .sort((a, b) => b.score - a.score);
  }
}
```

**Common Drag Points:**
- Unclear ownership leading to handoff delays
- Slow decision-making processes
- Work waiting for review or approval
- Context switching between different systems
- Lack of clear defaults for common decisions

### 2. Defaults Over Decisions

Every decision your team makes is cognitive overhead. The goal is to create sensible defaults that eliminate the need for most decisions while preserving flexibility for edge cases.

**The Default Hierarchy:**
1. **Team defaults** - Apply to all work (e.g., all PRs require tests)
2. **Project defaults** - Apply to specific initiatives (e.g., all API changes require OpenAPI specs)
3. **Individual overrides** - Explicit exceptions with justification

### 3. Ownership Over Handoffs

Traditional organizations create borders between teams, functions, and responsibilities. High-performance teams replace borders with outcomes, establishing clear ownership that spans the entire value chain.

## The Engineering Operating System Framework

### System Architecture Overview

::mermaid
    graph TD
    subgraph "Input Layer"
        A[Product Requirements]
        B[Technical Debt]
        C[Incident Response]
    end
    
    subgraph "Processing Layer"
        D[Decision Framework]
        E[Quality Gates]
        F[Review Process]
    end
    
    subgraph "Execution Layer"
        G[Development]
        H[Testing]
        I[Deployment]
    end
    
    subgraph "Output Layer"
        J[Production Features]
        K[Team Learning]
        L[Process Improvement]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    L --> D
::

### Core Components

**1. Decision-Making Systems**
- Clear frameworks for common decisions
- Escalation paths for complex issues
- Documentation of decisions and rationale

**2. Quality Assurance**
- Automated testing and validation
- Code review processes
- Performance and security gates

**3. Delivery Pipeline**
- Continuous integration and deployment
- Feature flag management
- Rollback and recovery procedures

**4. Learning Systems**
- Retrospectives and post-mortems
- Knowledge sharing mechanisms
- Metrics and feedback loops

## Decision-Making Systems That Scale

### The Decision Framework

Not all decisions are created equal. The most effective teams use different processes for different types of decisions.

```typescript
enum DecisionType {
  REVERSIBLE = 'reversible',
  IRREVERSIBLE = 'irreversible',
  STRATEGIC = 'strategic',
  TACTICAL = 'tactical'
}

interface DecisionProcess {
  type: DecisionType;
  timeLimit: number; // hours
  stakeholders: string[];
  documentation: boolean;
  reviewRequired: boolean;
}

class DecisionFramework {
  private processes: Map<DecisionType, DecisionProcess> = new Map([
    [DecisionType.REVERSIBLE, {
      type: DecisionType.REVERSIBLE,
      timeLimit: 1,
      stakeholders: ['owner'],
      documentation: false,
      reviewRequired: false
    }],
    [DecisionType.IRREVERSIBLE, {
      type: DecisionType.IRREVERSIBLE,
      timeLimit: 24,
      stakeholders: ['owner', 'tech-lead', 'product'],
      documentation: true,
      reviewRequired: true
    }],
    [DecisionType.STRATEGIC, {
      type: DecisionType.STRATEGIC,
      timeLimit: 72,
      stakeholders: ['owner', 'tech-lead', 'product', 'engineering-manager'],
      documentation: true,
      reviewRequired: true
    }]
  ]);

  getProcess(type: DecisionType): DecisionProcess {
    return this.processes.get(type)!;
  }
}
```

### Defaults for Common Decisions

**Technical Architecture:**
- Small, focused PRs behind feature flags
- Gradual rollouts with canary deployments
- Reversible decisions preferred over perfect solutions
- "Write before you build" documentation for non-trivial changes

**Process Decisions:**
- All production changes require tests
- All API changes require OpenAPI documentation
- All database changes require migration scripts
- All external dependencies require security review

**Quality Decisions:**
- Performance budgets for all user-facing features
- Security review for all authentication and authorization changes
- Accessibility review for all UI changes
- Internationalization review for all user-facing text

## Code Review and Quality Assurance

### The Two-Pass Review System

Traditional code review processes often mix safety concerns with style preferences, leading to long, unfocused reviews. The two-pass system separates these concerns for faster, more effective reviews.

**Pass 1: Safety and Scope**
- Is this change safe to deploy?
- Is the scope appropriate for a single PR?
- Are there adequate tests?
- Is the change behind a feature flag?

**Pass 2: Taste and Consistency**
- Does the naming follow team conventions?
- Is the code readable and maintainable?
- Does the implementation fit the overall architecture?
- Are there opportunities for improvement?

```typescript
interface ReviewChecklist {
  safety: {
    hasTests: boolean;
    behindFeatureFlag: boolean;
    reversible: boolean;
    performanceImpact: 'low' | 'medium' | 'high';
  };
  scope: {
    singleResponsibility: boolean;
    appropriateSize: boolean;
    clearCommitMessage: boolean;
  };
  consistency: {
    followsNamingConventions: boolean;
    matchesCodeStyle: boolean;
    fitsArchitecture: boolean;
  };
}

class ReviewProcess {
  async reviewPR(pr: PullRequest): Promise<ReviewResult> {
    const checklist = await this.generateChecklist(pr);
    
    // Pass 1: Safety and scope
    const safetyResult = await this.reviewSafety(checklist.safety);
    if (!safetyResult.approved) {
      return { approved: false, reason: 'Safety concerns', details: safetyResult.issues };
    }
    
    // Pass 2: Taste and consistency
    const consistencyResult = await this.reviewConsistency(checklist.consistency);
    
    return {
      approved: true,
      suggestions: consistencyResult.suggestions,
      requiresRedesign: consistencyResult.requiresRedesign
    };
  }
}
```

### When to Move to Documentation

If feedback requires architectural changes or significant redesign, move the discussion to a design document rather than continuing in the PR thread. This prevents:

- Long, unfocused PR discussions
- Mixing architectural decisions with implementation details
- Blocking other reviewers with design debates

## Ownership and Accountability Models

### The Ownership Framework

Clear ownership eliminates handoffs and accelerates decision-making. The ownership framework defines who is responsible for what outcomes, not just what tasks.

```typescript
interface OwnershipModel {
  owner: string;
  outcome: string;
  boundaries: {
    start: string;
    end: string;
  };
  decisionRights: string[];
  escalationPath: string[];
}

class OwnershipFramework {
  private ownerships: Map<string, OwnershipModel> = new Map();

  defineOwnership(
    area: string, 
    owner: string, 
    outcome: string,
    boundaries: { start: string; end: string }
  ): void {
    this.ownerships.set(area, {
      owner,
      outcome,
      boundaries,
      decisionRights: this.getDefaultDecisionRights(area),
      escalationPath: this.getDefaultEscalationPath(owner)
    });
  }

  getOwner(area: string): string | null {
    return this.ownerships.get(area)?.owner || null;
  }

  canMakeDecision(area: string, decision: string, person: string): boolean {
    const ownership = this.ownerships.get(area);
    return ownership?.owner === person && ownership.decisionRights.includes(decision);
  }
}
```

### End-to-End Ownership Examples

**Feature Ownership:**
- **Owner**: Senior Engineer
- **Outcome**: Feature successfully deployed and adopted by users
- **Boundaries**: From product requirements to user adoption metrics
- **Decision Rights**: Technical implementation, testing strategy, deployment approach

**Infrastructure Ownership:**
- **Owner**: DevOps Engineer
- **Outcome**: Reliable, scalable infrastructure that supports business needs
- **Boundaries**: From infrastructure requirements to production monitoring
- **Decision Rights**: Technology choices, scaling strategies, incident response

## Rituals and Ceremonies That Compound

### The Compound Effect of Small Rituals

The most effective engineering teams have simple, consistent rituals that compound over time. These aren't complex processes—they're small habits that create momentum and learning.

### Monday Planning Ritual (30 minutes)

**Purpose**: Align on the week's priorities and identify potential blockers early.

**Structure**:
1. **Review last week's outcomes** (5 minutes)
2. **Present this week's bets** (15 minutes)
3. **Identify blockers and dependencies** (10 minutes)

```typescript
interface WeeklyBet {
  id: string;
  title: string;
  outcome: string;
  successCriteria: string[];
  owner: string;
  dependencies: string[];
  risks: string[];
}

class WeeklyPlanning {
  async planWeek(bets: WeeklyBet[]): Promise<WeeklyPlan> {
    const blockers = this.identifyBlockers(bets);
    const dependencies = this.mapDependencies(bets);
    const risks = this.assessRisks(bets);
    
    return {
      bets: this.prioritizeBets(bets),
      blockers: this.assignBlockerOwners(blockers),
      dependencies: this.scheduleDependencies(dependencies),
      risks: this.createMitigationPlans(risks)
    };
  }
}
```

### Daily Flow Review (10 minutes)

**Purpose**: Unblock work and maintain momentum.

**Structure**:
1. **What's blocked?** (5 minutes)
2. **What can we unblock today?** (5 minutes)

This isn't a status meeting—it's a problem-solving session focused on removing obstacles.

### Friday Ship Review (15 minutes)

**Purpose**: Celebrate wins and improve one step in the process.

**Structure**:
1. **What did we ship this week?** (5 minutes)
2. **What went well?** (5 minutes)
3. **What's one thing we can improve next week?** (5 minutes)

## Metrics and Measurement Systems

### The Metrics That Actually Matter

Most engineering teams measure the wrong things. They track activity (commits, PRs, story points) instead of outcomes (cycle time, quality, user impact).

### Core Engineering Metrics

**Cycle Time Metrics:**
- **Lead Time**: From idea to production
- **Development Time**: From first commit to merge
- **Review Time**: From PR creation to first review
- **Deploy Time**: From merge to production

```typescript
interface CycleTimeMetrics {
  leadTime: number; // days
  developmentTime: number; // days
  reviewTime: number; // hours
  deployTime: number; // minutes
}

class MetricsCollector {
  async collectCycleTimeMetrics(pr: PullRequest): Promise<CycleTimeMetrics> {
    const events = await this.getPREvents(pr);
    
    return {
      leadTime: this.calculateLeadTime(events),
      developmentTime: this.calculateDevelopmentTime(events),
      reviewTime: this.calculateReviewTime(events),
      deployTime: this.calculateDeployTime(events)
    };
  }
}
```

**Quality Metrics:**
- **Rollback Rate**: Percentage of deployments that require rollback
- **Bug Escape Rate**: Percentage of bugs found in production
- **Test Coverage**: Percentage of code covered by automated tests
- **Performance Budget**: Compliance with performance targets

**Team Health Metrics:**
- **Onboarding Time**: Time for new team members to ship first change
- **Context Switching**: Frequency of interruptions and task changes
- **Knowledge Sharing**: Frequency of knowledge transfer sessions
- **Burnout Indicators**: Overtime hours, vacation usage, turnover

### Setting Up Metrics Collection

```typescript
class MetricsDashboard {
  private collectors: Map<string, MetricsCollector> = new Map();

  async generateReport(period: DateRange): Promise<EngineeringReport> {
    const cycleTimeData = await this.collectCycleTimeMetrics(period);
    const qualityData = await this.collectQualityMetrics(period);
    const teamHealthData = await this.collectTeamHealthMetrics(period);

    return {
      period,
      cycleTime: this.analyzeCycleTime(cycleTimeData),
      quality: this.analyzeQuality(qualityData),
      teamHealth: this.analyzeTeamHealth(teamHealthData),
      recommendations: this.generateRecommendations(cycleTimeData, qualityData, teamHealthData)
    };
  }
}
```

## Tooling and Automation Infrastructure

### The Automation Stack

Effective engineering operating systems rely on automation to eliminate manual work and ensure consistency. The automation stack should cover the entire development lifecycle.

### Pre-Commit Quality Gates

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: lint
        name: ESLint
        entry: npm run lint
        language: system
        types: [javascript, typescript]
      - id: type-check
        name: TypeScript Check
        entry: npm run type-check
        language: system
        types: [javascript, typescript]
      - id: test
        name: Unit Tests
        entry: npm run test
        language: system
        types: [javascript, typescript]
      - id: security
        name: Security Audit
        entry: npm audit
        language: system
        types: [javascript, typescript]
```

### CI/CD Pipeline Configuration

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality-gates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Test
        run: npm run test:coverage
      
      - name: Security audit
        run: npm audit --audit-level moderate
      
      - name: Bundle size check
        run: npm run bundle-size-check

  performance-budget:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build application
        run: npm run build
      - name: Performance budget
        run: npm run performance-budget

  deploy:
    needs: [quality-gates, performance-budget]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: npm run deploy
```

### Feature Flag Management

```typescript
interface FeatureFlag {
  name: string;
  enabled: boolean;
  rolloutPercentage: number;
  targetAudience: string[];
  conditions: FlagCondition[];
}

class FeatureFlagManager {
  async evaluateFlag(flagName: string, context: UserContext): Promise<boolean> {
    const flag = await this.getFlag(flagName);
    
    if (!flag.enabled) return false;
    
    // Check audience targeting
    if (!this.isInTargetAudience(flag.targetAudience, context)) return false;
    
    // Check rollout percentage
    if (!this.isInRolloutPercentage(flag.rolloutPercentage, context.userId)) return false;
    
    // Check conditions
    return this.evaluateConditions(flag.conditions, context);
  }
}
```

## Documentation and Knowledge Management

### The Documentation Hierarchy

Effective documentation follows a clear hierarchy that serves different audiences and use cases.

**1. Architecture Decision Records (ADRs)**
- Document significant architectural decisions
- Include context, options considered, and rationale
- Living documents that evolve with the system

**2. Design Documents**
- One-page documents for non-trivial features
- Problem, options, decision, and risks
- Created before implementation begins

**3. Runbooks**
- Step-by-step procedures for common operations
- Incident response procedures
- Deployment and rollback procedures

**4. API Documentation**
- Auto-generated from code
- Interactive examples and testing tools
- Version history and migration guides

### The "Write Before You Build" Process

```typescript
interface DesignDocument {
  title: string;
  problem: string;
  options: DesignOption[];
  decision: DesignOption;
  risks: Risk[];
  successCriteria: string[];
  timeline: string;
}

class DesignDocumentTemplate {
  generateTemplate(feature: string): DesignDocument {
    return {
      title: `${feature} Design Document`,
      problem: `[Describe the problem this feature solves]`,
      options: [
        {
          name: 'Option A',
          description: '[Describe the first approach]',
          pros: ['[List advantages]'],
          cons: ['[List disadvantages]'],
          effort: 'low|medium|high'
        }
      ],
      decision: null,
      risks: [],
      successCriteria: [],
      timeline: '[Estimated timeline]'
    };
  }
}
```

## Team Onboarding and Scaling

### The 30-Minute Architecture Tour

New team members need to understand the system architecture quickly. The 30-minute tour covers:

1. **System Overview** (10 minutes)
   - High-level architecture diagram
   - Key components and their responsibilities
   - Data flow and integration points

2. **Development Workflow** (10 minutes)
   - Local development setup
   - Testing and deployment process
   - Code review and quality gates

3. **Common Patterns** (10 minutes)
   - Coding conventions and standards
   - Error handling and logging
   - Performance and security considerations

### The First Week Checklist

```typescript
interface OnboardingChecklist {
  day1: string[];
  day2: string[];
  day3: string[];
  day4: string[];
  day5: string[];
}

const firstWeekChecklist: OnboardingChecklist = {
  day1: [
    'Complete local development setup',
    'Deploy a simple change to staging',
    'Review team documentation'
  ],
  day2: [
    'Fix a small bug in the codebase',
    'Write tests for the fix',
    'Submit first PR'
  ],
  day3: [
    'Review a teammate\'s PR',
    'Attend team rituals',
    'Shadow an on-call rotation'
  ],
  day4: [
    'Implement a small feature',
    'Write design document',
    'Present to team'
  ],
  day5: [
    'Deploy feature to production',
    'Monitor metrics and logs',
    'Complete onboarding survey'
  ]
};
```

### Scaling the Operating System

As teams grow, the operating system must scale without becoming bureaucratic.

**Team Size Guidelines:**
- **2-8 people**: Single operating system, direct communication
- **8-20 people**: Specialized roles, documented processes
- **20+ people**: Multiple operating systems, coordination mechanisms

## Common Anti-Patterns and How to Avoid Them

### Anti-Pattern 1: Architectural Debates in PR Threads

**Problem**: Long, unfocused discussions about architecture in code review comments.

**Solution**: Move architectural discussions to design documents. Use PR reviews for implementation feedback only.

### Anti-Pattern 2: Big-Bang Rewrites Without Flags

**Problem**: Attempting to rewrite entire systems without feature flags or gradual rollout.

**Solution**: Always use feature flags for major changes. Implement strangler fig patterns for system migrations.

### Anti-Pattern 3: Ownership Dissolved Across Committees

**Problem**: No clear owner for outcomes, leading to handoffs and delays.

**Solution**: Establish clear ownership boundaries. One person is accountable for each outcome.

### Anti-Pattern 4: Metrics Without Action

**Problem**: Collecting metrics but not using them to drive decisions.

**Solution**: Connect metrics to specific actions. If a metric doesn't change behavior, stop collecting it.

## Implementation Roadmap

### Week 1: Foundation
- [ ] Measure baseline cycle time and review wait time
- [ ] Add daily 10-minute unblocker standup
- [ ] Require one-page doc for non-trivial changes
- [ ] Implement pre-commit quality gates

### Week 2: Process
- [ ] Establish two-pass review system
- [ ] Define ownership boundaries
- [ ] Create decision-making framework
- [ ] Set up basic metrics collection

### Week 3: Automation
- [ ] Implement CI/CD pipeline
- [ ] Set up feature flag system
- [ ] Create performance budgets
- [ ] Automate deployment process

### Week 4: Optimization
- [ ] Analyze metrics and identify bottlenecks
- [ ] Optimize slowest parts of the process
- [ ] Create team onboarding checklist
- [ ] Establish retrospective process

## Future-Proofing Your Engineering OS

### Adapting to Change

The best engineering operating systems are designed to evolve. They provide structure without rigidity, enabling teams to adapt to new challenges and opportunities.

### Continuous Improvement

Regular retrospectives and metrics analysis ensure the operating system stays relevant and effective. The goal isn't to create the perfect system—it's to create a system that continuously improves.

### Scaling Considerations

As your team and organization grow, the operating system will need to adapt. Plan for:
- Multiple teams with different operating systems
- Coordination mechanisms between teams
- Shared services and infrastructure
- Knowledge sharing across teams

## Conclusion

Building an effective engineering operating system isn't about creating more process—it's about creating the right process. The systems outlined in this guide have been proven in production environments with teams ranging from 5 to 500 engineers.

The key insight is that shipping becomes a habit when the right move is the easy move. By reducing drag, establishing clear defaults, and creating systematic feedback loops, you can transform your engineering team from a collection of individuals into a high-performance system.

**Key Takeaways:**

1. **Focus on reducing drag, not adding power** - Eliminate friction rather than adding more process
2. **Create defaults for common decisions** - Reduce cognitive load with sensible defaults
3. **Establish clear ownership boundaries** - Replace handoffs with outcomes
4. **Measure what matters** - Track outcomes, not activity
5. **Automate everything possible** - Use tools to ensure consistency and speed
6. **Document decisions and rationale** - Create institutional memory
7. **Continuously improve** - Regular retrospectives and metrics analysis

The engineering operating system is never finished—it's always evolving. Start with the basics, measure the impact, and iterate based on what you learn. The goal isn't perfection; it's continuous improvement toward predictable, sustainable shipping.

**Related Articles:**
- [Building Teams That Ship](../tech/building-teams-that-ship.md)
- [Design Docs That Work](../tech/design-docs-that-work.md)
- [Effective Frontend Architecture](../tech/effective-frontend-architecture.md)
- [Performance First Principles](../tech/performance-first-principles.md)
