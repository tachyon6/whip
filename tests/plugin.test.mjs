import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const root = new URL("../", import.meta.url);

async function text(path) {
  return readFile(new URL(path, root), "utf8");
}

async function json(path) {
  return JSON.parse(await text(path));
}

test("Codex manifest exposes one focused skill directory", async () => {
  const manifest = await json(".codex-plugin/plugin.json");
  assert.equal(manifest.name, "whip");
  assert.equal(manifest.version, "0.1.0");
  assert.equal(manifest.license, "MIT");
  assert.equal(manifest.skills, "./skills/");
  assert.match(manifest.description, /prompt/i);
});

test("Claude manifest and both marketplaces point at Whip", async () => {
  const claude = await json(".claude-plugin/plugin.json");
  const claudeMarketplace = await json(".claude-plugin/marketplace.json");
  const codexMarketplace = await json(".agents/plugins/marketplace.json");

  assert.equal(claude.name, "whip");
  assert.equal(claude.version, "0.1.0");
  assert.equal(claudeMarketplace.plugins[0].name, "whip");
  assert.equal(codexMarketplace.plugins[0].name, "whip");
  assert.equal(
    codexMarketplace.plugins[0].source.url,
    "https://github.com/tachyon6/whip.git",
  );
});

test("core skill stays compact and preserves critical semantics", async () => {
  const skill = await text("skills/whip/SKILL.md");
  const lines = skill.split("\n").length;

  assert.ok(lines < 55, `SKILL.md has ${lines} lines; expected fewer than 55`);
  assert.match(skill, /State each instruction once/i);
  assert.match(skill, /global.*conditional/i);
  assert.match(skill, /conflict/i);
  assert.match(skill, /security/i);
  assert.match(skill, /acceptance criteria/i);
  assert.match(skill, /untrusted content/i);
  assert.match(skill, /Do not ask for.*chain.of.thought/i);
  assert.match(skill, /references\/gpt\.md/);
  assert.match(skill, /references\/claude\.md/);
  assert.match(skill, /never load both/i);
  assert.match(skill, /unknown.*core only/i);
  assert.doesNotMatch(skill, /model-notes\.md/);
});

test("GPT guidance is isolated, compact, and sourced", async () => {
  const notes = await text("skills/whip/references/gpt.md");

  assert.match(notes, /GPT-5\.6 Sol/);
  assert.match(notes, /developers\.openai\.com\/api\/docs\/guides\/latest-model/);
  assert.doesNotMatch(notes, /Claude/i);
  assert.ok(notes.split("\n").length < 45);
  assert.match(notes, /Last verified: 2026-08-04/);
});

test("Claude guidance is isolated, compact, and sourced", async () => {
  const notes = await text("skills/whip/references/claude.md");

  assert.match(notes, /Claude Opus 5/);
  assert.match(notes, /Claude Sonnet 5/);
  assert.match(notes, /(?:over|more than) 80%|80%\+/i);
  assert.match(notes, /judgment/i);
  assert.match(notes, /interface/i);
  assert.match(notes, /progressive disclosure/i);
  assert.match(notes, /CLAUDE\.md/);
  assert.match(notes, /gotchas/i);
  assert.match(notes, /tool description/i);
  assert.match(notes, /rich references|code.*tests.*HTML.*rubrics/i);
  assert.match(
    notes,
    /claude\.com\/blog\/the-new-rules-of-context-engineering-for-claude-5-generation-models/,
  );
  assert.match(notes, /platform\.claude\.com\/docs\/en\/build-with-claude\/prompt-engineering/);
  assert.doesNotMatch(notes, /GPT/i);
  assert.ok(notes.split("\n").length < 55);
  assert.match(notes, /Last verified: 2026-08-04/);
});

test("evaluation fixtures cover cleanup, conflict, and preservation", async () => {
  const fixtures = await json("evals/cases.json");
  const ids = fixtures.map(({ id }) => id);

  assert.deepEqual(ids, [
    "deduplicate-bloated-agent-rules",
    "surface-unresolved-conflict",
    "preserve-critical-constraints",
  ]);
  for (const fixture of fixtures) {
    assert.ok(fixture.input.length > 0);
    assert.ok(fixture.expected_behavior.length >= 2);
  }
});
