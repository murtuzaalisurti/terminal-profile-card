import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const bin = fileURLToPath(new URL("../index.mjs", import.meta.url));

// Run the card with stdout piped, starting from a clean colour/width environment.
const run = (extra = {}) => {
    const env = { ...process.env };
    for (const key of ["NO_COLOR", "FORCE_COLOR", "FORCE_HYPERLINK", "COLUMNS", "NODE_DISABLE_COLORS"]) delete env[key];
    return execFileSync(process.execPath, [bin], { env: { ...env, ...extra }, encoding: "utf8" });
};

const urls = [
    "https://murtuzaalisurti.com",
    "https://github.com/murtuzaalisurti",
    "https://linkedin.com/in/murtuzaali-surti",
    "https://syntackle.com",
    "https://x.com/murtuza_surti",
];

test("piped output is plain text with every link readable", () => {
    const out = run();
    assert.ok(!out.includes("\x1b"), "no escape sequences when piped");
    for (const url of urls) assert.ok(out.includes(url.replace("https://", "")), url);
});

test("NO_COLOR wins over FORCE_COLOR", () => {
    assert.ok(!run({ NO_COLOR: "1", FORCE_COLOR: "3" }).includes("\x1b["));
});

test("truecolor accent when forced, no hyperlinks unless requested", () => {
    const out = run({ FORCE_COLOR: "3" });
    assert.ok(out.includes("\x1b[38;2;207;90;54m"));
    assert.ok(!out.includes("\x1b]8;;"));
});

test("basic colour falls back to the theme's red", () => {
    const out = run({ FORCE_COLOR: "1" });
    assert.ok(out.includes("\x1b[31m"));
    assert.ok(!out.includes("38;2;"));
});

test("FORCE_HYPERLINK emits an OSC 8 link per URL", () => {
    const out = run({ FORCE_HYPERLINK: "1" });
    for (const url of urls) assert.ok(out.includes(`\x1b]8;;${url}\x1b\\`), url);
});

for (const columns of [40, 50, 80, 120]) {
    test(`fits in ${columns} columns`, () => {
        for (const line of run({ COLUMNS: String(columns) }).split("\n")) {
            assert.ok(line.length <= columns, `${line.length} > ${columns}: ${line}`);
        }
    });
}
