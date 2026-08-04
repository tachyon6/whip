# Whip

**Cut prompt noise without cutting intent.**

Whip is a focused agent skill for writing, tightening, and auditing prompts. It removes repetition, scopes conditional rules, surfaces conflicts, and preserves the constraints that actually matter.

```text
Before: Be concise. Keep it short. Never be verbose. Explain every detail.

After: Lead with the conclusion. Include required evidence and material caveats.
Conflict: "Include every detail" needs an explicit exception or higher priority.
```

## Why

Prompt files tend to accumulate defensive rules after isolated failures. Current frontier models follow instructions literally enough that duplication and contradiction can reduce quality rather than improve it.

Whip applies one principle:

> The strongest prompt is the shortest prompt that reliably changes behavior.

It does not optimize for the fewest words at any cost. It preserves security, approvals, schemas, compatibility, acceptance criteria, and explicit preferences.

## Install

### Claude Code

Run as two separate commands:

```text
/plugin marketplace add tachyon6/whip
/plugin install whip@whip
```

Then invoke `/whip`, or ask Claude to tighten or audit a prompt.

### Codex

```bash
codex plugin marketplace add tachyon6/whip
codex plugin add whip@whip
```

Invoke `$whip`, or ask Codex to tighten or audit a prompt.

## Use

```text
Tighten this AGENTS.md without changing its behavior.
Audit this system prompt for duplication and conflicting priorities.
Write the smallest prompt that reliably produces this output schema.
Tighten this developer prompt for GPT-5.6 Sol.
Tighten this system prompt for Claude Opus 5.
```

Whip supports three modes:

- **write**: create the smallest sufficient prompt from an outcome.
- **tighten**: preserve behavior while removing noise.
- **audit**: report prompt defects and exact fixes without rewriting.

Whip resolves the target engine from the requested model, runtime, or host. It then loads exactly one engine reference:

- [`references/gpt.md`](skills/whip/references/gpt.md)
- [`references/claude.md`](skills/whip/references/claude.md)

If the engine is unknown, Whip uses universal rules only. It never loads both references.

For Claude 5, Whip turns current context-engineering guidance into edits: replace stale blanket rules with judgment criteria, prefer expressive tool interfaces over usage examples, progressively disclose conditional workflows, and keep `CLAUDE.md` limited to repo purpose and non-obvious gotchas.

## The cut

Whip checks, in order:

1. Does this text change the desired outcome or success condition?
2. Is it already reliable model behavior?
3. Is the same instruction stated elsewhere?
4. Is the rule global, or should it live beside a trigger, tool, or skill?
5. Does it conflict with another rule?
6. Is an API control better than prose?
7. Does an example fix a measured gap?
8. Can it be shorter without changing behavior?

## Architecture

- One canonical behavior skill under `skills/whip/`.
- Thin Claude Code and Codex manifests point to the same skill.
- GPT and Claude guidance stay in separate on-demand references instead of the core prompt.
- No lifecycle hooks, model API dependency, or copied always-on rules in the MVP.

## Development

```bash
npm test
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/whip
python3 ~/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py .
```

The evaluation fixtures in `evals/cases.json` define the first behavior contract. Run them against each supported model before claiming model-level quality gains.

## Research

The design rationale and dated official sources are in [`docs/whip-model-prompting-research.md`](docs/whip-model-prompting-research.md).

## License

MIT
