# Claude

Last verified: 2026-08-04. Recheck official documentation before treating this as current.

## Current family

- Be clear and direct. Use positive instructions and explicit scope.
- Use XML or headings only when mixed instructions, context, examples, and inputs need separation.
- Use effort for reasoning depth instead of accumulating reasoning instructions.

## Claude 5 context policy

Anthropic reports removing over 80% of Claude Code's system prompt for advanced Claude 5 models without measurable coding-eval loss. Treat this as evidence for deletion and evaluation, not a Whip performance claim.

- Prefer judgment over broad, rigid rules. Replace a blanket rule with the contextual criterion the model should apply.
- Keep the system prompt about product context and the agent's job; place repo and workflow details in their narrower layer.
- For tool behavior, design an expressive interface and schema before adding usage examples.
- Use progressive disclosure: move conditional review, verification, and workflows into skills loaded only when triggered.
- State tool instructions once, in the tool description.
- Keep `CLAUDE.md` lightweight: repo purpose and non-obvious gotchas, not facts discoverable from the filesystem.
- Do not use `CLAUDE.md` as manual session memory when the host provides memory or scoped references.
- Keep skills lightweight and product-specific; avoid constraining model judgment outside critical boundaries.
- Prefer rich references—code, tests, HTML, and rubrics—over verbose prose or screenshots.
- Keep examples only for a required output format or measured behavior gap; make them relevant and diverse.

## Claude Opus 5

- Give the complete task specification up front, then let it execute.
- Prompt visible response length explicitly; effort does not reliably control verbosity.
- Remove generic verify, double-check, and reviewer instructions; they cause over-verification.
- Constrain narrow scope explicitly.
- Reserve subagents for sizeable, genuinely independent work and cap delegation.

## Claude Sonnet 5

- It follows scope literally. State whether a rule applies to one item, every item, or a named section.
- Prefer a concise positive example over negative formatting rules.
- Raise effort for hard reasoning rather than adding planning prose.
- Remove forced progress updates unless they are a product requirement.
- Describe when and why to use tools; avoid blanket mandates.

## Sources

- [The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)
- [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5)
- [Prompting Claude Sonnet 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5)
- [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
