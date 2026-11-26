// One Line, One Chill — make.fun entry (u-azazex-one-line-one-chill-6d4d5488).
// Writes one horror line: a single sentence of 1–200 characters, to /output/entry.txt.
// Node stdlib only. Deterministic: the line is a fixed string.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My dead grandmother's voice whispered my childhood nickname through the baby monitor, and the nursery has been empty for three years.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}
if (!/^[^.!?]+[.!?]$/.test(LINE)) {
  throw new Error("entry line must be a single sentence");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, LINE, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}

console.log(LINE);
console.log(`(${LINE.length} characters)`);
