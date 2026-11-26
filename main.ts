// One Line, One Chill — make.fun entry.
// The scare lives in the line itself: a fixed sentence, one breath, no setup.
// This script only checks the shape, saves it, and reads it back to be sure.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const scare =
  "My dead grandmother's voice whispered my childhood nickname through the baby monitor, and the nursery has been empty for three years.";

function checkShape(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${text.length}`);
  }
  if (!/^[^.!?]+[.!?]$/.test(text)) {
    throw new Error("line must be a single sentence");
  }
}

checkShape(scare);

const outFolder = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outFolder, { recursive: true });
const target = join(outFolder, "entry.txt");
writeFileSync(target, scare, "utf8");
// World-readable output file; the output directory itself is left alone.
chmodSync(target, 0o644);

const saved = readFileSync(target, "utf8");
if (saved !== scare) {
  throw new Error("saved file does not match the line");
}

console.log(scare);
console.log(`(${scare.length} characters)`);
