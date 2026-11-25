// Funniest Autocorrect Fail — make.fun entry
// Writes a single autocorrect-fail line to /output/entry.txt.
// The line is assembled from fixed parts so the output is fully
// deterministic: no randomness, no clock, no environment reads.

import { mkdirSync, writeFileSync } from "node:fs";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// The slip and its correction, kept as a named pair so the joke's
// mechanism is explicit: the phone turned "present" into "pregnant".
const SLIP = "pregnant";
const INTENDED = "PRESENT";

// The message in four beats: the wrong word lands, the sender panics
// and corrects it, the correction is restated, and the family fallout
// keeps escalating anyway.
const BEATS = [
  `Mom, I'm finally ${SLIP}!`,
  `I mean ${INTENDED}.`,
  "I'm finally present. At dinner.",
  "Please stop crying and tell Dad to get up.",
];

function buildEntry(beats: string[]): string {
  return beats.join(" ");
}

function main(): void {
  const line = buildEntry(BEATS);
  if (line.length < 1 || line.length > 199) {
    throw new Error(`entry length ${line.length} outside 1..199`);
  }
  if (!line.trim()) {
    throw new Error("entry is blank");
  }
  // The joke only works if both the slip and the correction survive.
  if (!line.includes(SLIP) || !line.includes(INTENDED)) {
    throw new Error("entry lost its slip or its correction");
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, line, "utf8");
}

main();
