# GPT

Last verified: 2026-08-04. Recheck official documentation before treating this as current.

## GPT-5.6 Sol

- Favor lean prompts. State each instruction once; remove repeated examples and irrelevant tools.
- It is concise by default. Keep brevity instructions only when evaluations need them.
- For short output, name what must remain: conclusion, evidence, material caveat, next action.
- Put autonomy, approval, and stop conditions in one compact policy. Repetition can cause needless confirmation.
- Use `text.verbosity` for default detail and prompt text only for task-specific overrides.
- Use reasoning effort or pro mode through API controls; do not simulate them with “think harder” prose.
- Resolve contradictions before adding emphasis. Conflicts waste reasoning on reconciliation.
- Give tools precise triggers, inputs, output fields, error behavior, and stopping conditions.

## Editing rule

Make minimal edits to the existing prompt. Add a rule only for a measured failure; delete the stale rule it replaces.

## Sources

- [Model guidance](https://developers.openai.com/api/docs/guides/latest-model)
- [GPT-5.6 Sol model](https://developers.openai.com/api/docs/models/gpt-5.6-sol)
- [GPT-5 prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide)
