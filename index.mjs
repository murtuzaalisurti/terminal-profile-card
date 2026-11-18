#!/usr/bin/env node

// A terminal business card. No dependencies: styling, hyperlinks and
// wrapping are done with plain ANSI escape sequences.

const name = "Murtuzaali Surti";
const role = "senior software engineer";
const bio =
    "I talk to machines and let them talk back. Bylines on CSS-Tricks and freeCodeCamp; writing now at syntackle.com.";
const links = [
    "https://murtuzaalisurti.com",
    "https://github.com/murtuzaalisurti",
    "https://linkedin.com/in/murtuzaali-surti",
    "https://syntackle.com",
    "https://x.com/murtuza_surti",
];

const { stdout, env, platform } = process;
const isTTY = Boolean(stdout.isTTY);

// --- Capabilities -----------------------------------------------------------

// getColorDepth() honours NO_COLOR, FORCE_COLOR, NODE_DISABLE_COLORS and TERM.
// When piped, colour is off unless FORCE_COLOR is set.
const colorDepth = (() => {
    if ("NO_COLOR" in env && env.NO_COLOR !== "") return 1;
    if (isTTY) return stdout.getColorDepth();
    const force = env.FORCE_COLOR;
    if (force === undefined || force === "0" || force === "false") return 1;
    return { 1: 4, 2: 8, 3: 24 }[force] ?? 4;
})();
const color = colorDepth > 1;

// OSC 8 hyperlinks, only where the terminal is known to support them.
// FORCE_HYPERLINK=1/0 overrides detection.
const hyperlinks = (() => {
    if (env.FORCE_HYPERLINK !== undefined) return env.FORCE_HYPERLINK !== "0";
    if (!isTTY || env.CI) return false;
    const program = env.TERM_PROGRAM ?? "";
    return (
        ["iTerm.app", "WezTerm", "vscode", "ghostty", "Hyper", "Tabby"].includes(program) ||
        Boolean(env.WT_SESSION) || // Windows Terminal
        Boolean(env.KONSOLE_VERSION) ||
        Number(env.VTE_VERSION) >= 5000 || // GNOME Terminal, Tilix, ...
        (env.TERM ?? "").includes("kitty") ||
        (env.TERM ?? "").includes("alacritty")
    );
})();

// Legacy Windows consoles may lack the glyphs; everything else has them.
const unicode = platform !== "win32" || Boolean(env.WT_SESSION || env.TERM_PROGRAM);
const glyph = { bar: unicode ? "▌" : "|", arrow: unicode ? "→" : ">" };

// --- Styling ----------------------------------------------------------------

const sgr = (open, close) => (text) => (color ? `\x1b[${open}m${text}\x1b[${close}m` : text);
const bold = sgr(1, 22);
const dim = sgr(2, 22);
const underline = sgr(4, 24);
// Accent is used only on non-text marks (bar, arrows). Truecolor #cf5a36 keeps
// >= 3:1 contrast on common dark and light themes; otherwise use the theme's red.
const accent = colorDepth >= 24 ? sgr("38;2;207;90;54", 39) : sgr(31, 39);

const link = (url, text) =>
    hyperlinks ? `\x1b]8;;${url}\x1b\\${underline(text)}\x1b]8;;\x1b\\` : text;

// --- Layout -----------------------------------------------------------------

const indent = "    ";
const columns = stdout.columns || Number(env.COLUMNS) || 80;
const measure = Math.max(20, Math.min(48, columns - indent.length - 2));

const wrap = (text, width) => {
    const lines = [];
    for (const word of text.split(" ")) {
        const last = lines.at(-1);
        if (last !== undefined && last.length + 1 + word.length <= width) lines[lines.length - 1] = `${last} ${word}`;
        else lines.push(word);
    }
    return lines;
};

const card = [
    "",
    `  ${accent(glyph.bar)} ${bold(name)}`,
    `  ${accent(glyph.bar)} ${dim(role)}`,
    "",
    ...wrap(bio, measure).map((line) => indent + line),
    "",
    ...links.map((url) => `${indent}${accent(glyph.arrow)} ${link(url, url.replace(/^https:\/\//, ""))}`),
    "",
];

stdout.write(card.join("\n") + "\n");
