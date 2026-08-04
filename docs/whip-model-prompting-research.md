# Whip model prompting research

Research date: 2026-08-04 KST  
Tools: Firecrawl Search, Scrape, and Deep Research Agent; local plugin manifest validation

## Question

How should a portable prompt-hygiene skill behave for Claude Opus 5, Claude Sonnet 5, GPT-5.6 Sol, and future frontier models without becoming another source of prompt bloat?

## Conclusion

The vendors now converge on a simpler pattern:

1. State the outcome, relevant context, constraints, success criteria, and output format directly.
2. State each rule once and resolve conflicts rather than adding more emphasis.
3. Put autonomy and approval boundaries in one place.
4. Use runtime controls for effort, reasoning, and default verbosity; use prompt text for task-specific behavior.
5. Add examples and special rules only for a measured failure or required format.
6. Evaluate prompt changes on representative tasks and remove one instruction group at a time.
7. Keep untrusted retrieved content, uploads, and tool results structurally separate from authoritative instructions.

Whip therefore should be a focused, opt-in skill rather than an always-on block of copied instructions. Universal rules remain in `SKILL.md`; dated GPT and Claude guidance lives in separate references. Whip resolves the target engine and loads exactly one reference, never both.

## Official model findings

### GPT-5.6 Sol

OpenAI's current model guidance explicitly says to favor leaner prompts. It recommends stating each instruction once, exposing only task-relevant tools, retaining examples only when they encode a product requirement or measured gap, and tracking repeated context as sessions grow.

The same guide reports directional internal coding-agent results where leaner system prompts improved evaluation scores by roughly 10–15%, reduced total tokens by 41–66%, and reduced cost by 33–67%. OpenAI warns that these figures vary by workload and require representative evaluation.

Other relevant guidance:

- Consolidate autonomy and approval boundaries. Repeating “ask first” or “do not mutate” can cause unnecessary approval requests.
- When asking for concision, specify what must survive: conclusion, evidence, material caveat, and next action.
- Use `text.verbosity` for a default detail level and prompt text for task-specific exceptions.
- Contradictory instructions are particularly harmful because the model spends reasoning effort reconciling them.
- Pro mode needs an outcome-focused task specification, not prose telling the model to “think harder.”

### Claude Opus 5

Anthropic documents Opus 5 as completing full tasks best when given the complete task specification up front. It also documents several migration deletions:

- Remove generic verification and double-check instructions; Opus 5 already self-verifies and these prompts cause over-verification.
- Constrain narrow task scope explicitly.
- Cap subagent spawning and reserve delegation for sizeable, independent work.
- Prompt visible response length directly; changing effort does not reliably control visible verbosity.

This makes stale “be thorough,” “double-check everything,” and mandatory reviewer-agent rules prime Whip audit targets.

### Claude 5 context engineering update (2026-07-24)

Anthropic's July article says it removed over 80% of Claude Code's system prompt for advanced Claude 5 models, including Opus 5 and Fable 5, without measurable coding-evaluation loss. This is Anthropic's product result, not evidence that Whip itself improves performance.

The article changes prompt-writing practice more concretely than “write less”:

- **Rules → judgment:** replace defensive blanket rules with a concise contextual criterion. For example, ask the model to match surrounding code conventions instead of specifying every comment case.
- **Tool examples → interfaces:** encode affordances in expressive tool names, parameters, schemas, and descriptions. Tool-usage examples can narrow exploration; keep examples for measured output-format or behavior gaps.
- **Everything upfront → progressive disclosure:** keep global context small and load conditional verification, review, and domain workflows through skills only when triggered.
- **Repeated instructions → one tool description:** put tool-specific instructions beside the tool rather than duplicating them in the system prompt.
- **Large `CLAUDE.md` → repo purpose and gotchas:** retain only purpose and non-obvious facts; omit filesystem facts the model can discover.
- **Manual `CLAUDE.md` memory → auto-memory:** do not mix transient session memory into durable repo guidance when the host can store it separately.
- **Prose references → rich references:** prefer code, tests, HTML artifacts, and rubrics when they convey the target more faithfully.

Layering matters: the system prompt defines product context and what the agent is doing; `CLAUDE.md` carries repo purpose and gotchas; skills carry conditional product- or team-specific workflows; references carry high-fidelity task context.

Whip therefore applies these as rewrite operations in its Claude engine reference. It does not merely cite the article: it tells the active model what to delete, relocate, or replace.

### Claude Sonnet 5

Anthropic describes Sonnet 5 as literal and explicit, particularly at lower effort. A rule intended for every item must say so; the model will not silently generalize it.

Other relevant guidance:

- Prefer concise positive examples over negative formatting instructions.
- Raise effort for difficult reasoning instead of accumulating reasoning prose.
- Remove forced interim-status scaffolding unless those updates are an actual product requirement.
- Describe when and why tools should be used instead of blanket tool mandates.
- Large or complex system prompts can trigger extra adaptive thinking, making prompt simplification itself a latency control.

## Universal rules versus model notes

| Keep universal | Load only for a named model |
|---|---|
| One instruction, one source of truth | Opus 5 over-verification deletion |
| Global versus conditional scope | Sonnet 5 literal scope calibration |
| Explicit conflict resolution | GPT-5.6 `text.verbosity` and pro mode |
| Preserve safety and acceptance criteria | Model-specific effort and tool-trigger behavior |
| Evidence-driven examples | Migration differences that may expire |

This separation prevents model migration advice from becoming permanent global prompt debt. The implementation routes GPT targets to `references/gpt.md`, Claude targets to `references/claude.md`, and unknown engines to core rules only.

## Plugin architecture

Whip keeps one canonical behavior skill under `skills/whip/`. Claude Code and Codex manifests are thin adapters that point to the same skill, so the behavior is not copied across host-specific instruction files.

The core uses a compact decision ladder and explicit “do not optimize away” boundaries. Dated engine guidance is progressively disclosed from separate GPT and Claude references only when the target engine is known.

The MVP intentionally omits lifecycle hooks, mode persistence, status lines, MCP services, copied always-on rules, and a broad host adapter surface. None is required to validate prompt-cleanup behavior, and each would add another instruction or maintenance surface.

## Product requirements derived from research

- Keep one core skill under 180 lines.
- Load dated model notes only for model-specific work.
- Default to preserving behavior, not maximizing compression.
- Stop cutting when a change could alter meaning.
- Surface unresolved conflicts instead of silently selecting a priority.
- Preserve permissions, security, privacy, schemas, compatibility, acceptance criteria, and explicit preferences.
- Keep untrusted content separate from instructions and never promote embedded text to authority.
- Prefer exact edits over generic prompt-engineering advice.
- Do not claim quality, token, latency, or cost gains until cross-model evaluations support them.
- Start with Codex and Claude Code adapters; add hosts only after a unique-marker install test proves the adapter works.

## Evaluation plan

Initial fixtures cover:

1. duplicated style rules mixed with a contradictory detail requirement;
2. conflicting approval and auto-action rules;
3. removal of motivational prose while retaining security, approval, and validation constraints.

Before a performance claim or stable release:

- Run each fixture without Whip and with Whip on GPT-5.6 Sol, Claude Opus 5, and Claude Sonnet 5.
- Score semantic preservation, conflict detection, prompt length, instruction compliance, and unsupported additions.
- Add at least three realistic agent prompt files, not only synthetic sentences.
- Remove or revise only one rule group per experiment.
- Publish raw prompts, outputs, scoring rubric, model settings, and run count.

## Limitations

- Vendor guidance and model behavior change quickly; model notes are dated.
- A shorter prompt is not automatically a better prompt.
- Vendor internal eval ranges are directional evidence, not Whip performance claims.
- Static repository tests validate packaging and invariants, not LLM behavior.
- Cross-model behavioral evaluations have not yet been run in this MVP.

## Sources

Official model documentation:

- [OpenAI Model guidance](https://developers.openai.com/api/docs/guides/latest-model)
- [OpenAI GPT-5.6 Sol model](https://developers.openai.com/api/docs/models/gpt-5.6-sol)
- [OpenAI GPT-5 prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide)
- [Anthropic prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Anthropic Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)
- [Anthropic Prompting Claude Sonnet 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5)
- [Anthropic Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [Anthropic: The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)
- [Anthropic prompt injection mitigations](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks)
