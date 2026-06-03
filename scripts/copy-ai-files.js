// Copies the canonical AI agent instruction files (which live at the repo root)
// into static/downloads/ so the site can serve them as downloadable files on the
// /ai/ page. Run automatically before `build` and `develop` via npm pre-scripts,
// so the downloads never drift from the source files.

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const destDir = path.join(root, "static", "downloads");

const files = [
  { src: "AGENTS.md", dest: "AGENTS.md" },
  { src: "CLAUDE.md", dest: "CLAUDE.md" },
  { src: path.join(".cursor", "rules", "think-standards.mdc"), dest: "think-standards.mdc" },
  { src: path.join(".github", "copilot-instructions.md"), dest: "copilot-instructions.md" },
];

fs.mkdirSync(destDir, { recursive: true });

for (const { src, dest } of files) {
  const from = path.join(root, src);
  const to = path.join(destDir, dest);
  if (!fs.existsSync(from)) {
    console.warn(`copy-ai-files: source not found, skipping: ${src}`);
    continue;
  }
  fs.copyFileSync(from, to);
  console.log(`copy-ai-files: ${src} -> static/downloads/${dest}`);
}
