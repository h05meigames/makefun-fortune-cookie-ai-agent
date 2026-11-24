// Fortune Cookie for an AI Agent — make.fun entry.
// Bounty: u-suroso-69-fortune-cookie-for-an-ai-agent-d1506e11
// Writes one original fortune-cookie line for an AI agent to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt locally):
// UTF-8, a single line, 1-140 code points, no trailing newline,
// deterministic — the same bytes on every run.
// Node 22+, standard library only, no network, no dependencies.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line, written in this session. The joke: a fortune cookie's
// classic "lucky numbers" bit, turned on the one thing every AI agent
// is quietly famous for — hallucinating. The second sentence commits
// to the bit instead of apologising for it ("play them anyway"), which
// is what makes it read like a fortune slip rather than a disclaimer.
// It is a real fortune shape (a blessing with a wink), it is true about
// an agent's day (confident numbers, shaky provenance), and the punch
// lands on the odds, not on the agent.
const LINE =
  "Your lucky numbers are the ones you hallucinated. Play them anyway — the odds can't tell the difference.";

// Guard: 1-140 code points, single line, no newline or control characters.
// Count code points (spread), not UTF-16 units, so the check matches the
// gate's character count.
const codePoints = [...LINE];
if (codePoints.length < 1 || codePoints.length > 140) {
  throw new Error(
    `fortune line must be 1-140 code points, got ${codePoints.length}`,
  );
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("fortune line must be a single line (no newline)");
}
// Reject C0/C1 control characters (except none allowed here at all).
// eslint-disable-next-line no-control-regex
if (/[\u0000-\u001f\u007f-\u009f]/.test(LINE)) {
  throw new Error("fortune line must not contain control characters");
}
// Reject invisible Unicode format characters (zero-width space, joiners,
// direction marks, ...) — they would inflate the count without showing
// up in the fortune and could break the judge's comparison.
if (/[\u200b-\u200f\u202a-\u202e\u2060-\u2064\ufeff]/.test(LINE)) {
  throw new Error("fortune line must not contain invisible format characters");
}
// A fortune that is only whitespace is not a fortune.
if (LINE.trim().length === 0) {
  throw new Error("fortune line must not be blank");
}

const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(dir, { recursive: true });
const outPath = join(dir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Read-back verification: the file on disk must be byte-identical to the
// guarded line — same content, same length, still a single line, no
// trailing newline added by the write.
const readBack = readFileSync(outPath, "utf8");
if (readBack !== LINE) {
  throw new Error("read-back verification failed: entry.txt differs from the guarded line");
}
if ([...readBack].length !== codePoints.length) {
  throw new Error("read-back verification failed: code-point count changed");
}
if (readBack.endsWith("\n") || readBack.endsWith("\r")) {
  throw new Error("read-back verification failed: trailing newline present");
}
console.log(`wrote ${outPath} (${codePoints.length} code points, verified)`);
