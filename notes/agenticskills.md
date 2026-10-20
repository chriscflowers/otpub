---
type: solution
title: Agentic Skills
summary: Learn about Agentic Skills and how Aviator will use them.
topic: Research
tags: [Aviator. Agentic]
date: October 20, 2026
status: Published
---

## Overview
A skill is a structured instruction file that gives an AI assistant deep, task-specific knowledge before it attempts a piece of work.

Think of it like an onboarding document for a new employee. Rather than learning through trial and error, the assistant reads the skill first and arrives at the task already knowing the best tools to use, the right process to follow, common mistakes to avoid, and how to verify the quality of the output.

Skills typically contain a few key components: 
- a description of when the skill applies
- step-by-step workflows
- technical commands or code snippets
- design or quality standards
- a checklist for reviewing the final output before delivering it.

The practical effect is consistency and quality. Without a skill, an AI might produce adequate results but take inefficient paths or make avoidable mistakes. With a skill, it follows a proven, repeatable process every time — more like a trained specialist than a generalist making educated guesses.

Skills are also modular and composable. A single task might draw on multiple skills simultaneously — for example, creating a document that contains charts might invoke both a word processing skill and a data visualization skill at the same time.

From a user's perspective, skills are largely invisible. You just make a request, and the assistant quietly consults the relevant skill in the background before responding. The result is that outputs tend to be more polished, more consistent, and require less back-and-forth correction than they would without that underlying guidance.

## Solution Links
[Agent Skills Overview](https://agentskills.io/home) from agentskills.io.
- [Quickstart Guide](https://agentskills.io/skill-creation/quickstart)
- [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices)
- [Optimizing Skill Descriptions](https://agentskills.io/skill-creation/optimizing-descriptions)
- [Example Skills](https://github.com/anthropics/skills)


## Structure and Implementation
At its core, a skill is a folder containing a `SKILL.md` file. This file includes metadata (`name` and `description`, at minimum) and instructions that tell an agent how to perform a specific task. Skills can also bundle scripts, reference materials, templates, and other resources.

```
my-skill/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

### How do Agent Skills work?

Agents load skills through **progressive disclosure**, in three stages:

1. **Discovery**: At startup, agents load only the name and description of each available skill, just enough to know when it might be relevant.
2. **Activation**: When a task matches a skill’s description, the agent reads the full `SKILL.md` instructions into context.
3. **Execution**: The agent follows the instructions, optionally executing bundled code or loading referenced files as needed.

Full instructions load only when a task calls for them, so agents can keep many skills on hand with only a small context footprint.


### Best practices
***Start from real expertise***
A common pitfall in skill creation is asking an LLM to generate a skill without providing domain-specific context — relying solely on the LLM’s general training knowledge. Effective skills are grounded in real expertise. The key is feeding domain-specific context into the creation process.

***Synthesize from existing artifacts***
When you have a body of existing knowledge, you can feed it into an LLM and ask it to synthesize a skill. A data-pipeline skill synthesized from your team’s actual incident reports and runbooks will outperform one synthesized from a generic “data engineering best practices” article, because it captures _your_ schemas, failure modes, and recovery procedures. The key is project-specific material, not generic references.Good source material includes:

- Internal documentation, runbooks, and style guides
- API specifications, schemas, and configuration files
- Code review comments and issue trackers (captures recurring concerns and reviewer expectations)
- Version control history, especially patches and fixes (reveals patterns through what actually changed)
- Real-world failure cases and their resolutions

#### Optimizing skill descriptions
 A skill only helps if it gets activated. The `description` field in your `SKILL.md` frontmatter is the primary mechanism agents use to decide whether to load a skill for a given task. An under-specified description means the skill won’t trigger when it should; an over-broad description means it triggers when it shouldn’t.

***How skill triggering works***
Agents use progressive disclosure to manage context. At startup, they load only the name and description of each available skill — just enough to decide when a skill might be relevant. When a user’s task matches a description, the agent reads the full SKILL.md into context and follows its instructions.

This means the description carries the entire burden of triggering. If the description doesn’t convey when the skill is useful, the agent won’t know to reach for it.


***Writing effective descriptions***
Before testing, it helps to know what a good description looks like. A few principles:
- Use imperative phrasing. Frame the description as an instruction to the agent: “Use this skill when…” rather than “This skill does…” The agent is deciding whether to act, so tell it when to act.
- Focus on user intent, not implementation. Describe what the user is trying to achieve, not the skill’s internal mechanics. The agent matches against what the user asked for.
- Err on the side of being pushy. Explicitly list contexts where the skill applies, including cases where the user doesn’t name the domain directly: “even if they don’t explicitly mention ‘CSV’ or ‘analysis.’”
- Keep it concise. A few sentences to a short paragraph is usually right — long enough to cover the skill’s scope, short enough that it doesn’t bloat the agent’s context across many skills.

