#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SKILL_NAME = "pictify";
const SKILL_SOURCE = join(__dirname, "skills", SKILL_NAME);

// Determine target directory
const args = process.argv.slice(2);
const isProject = args.includes("--project") || args.includes("-p");
const isUninstall = args.includes("--uninstall") || args.includes("-u");

const globalSkillsDir = join(
  process.env.CLAUDE_CONFIG_DIR || join(homedir(), ".claude"),
  "skills"
);
const projectSkillsDir = join(process.cwd(), ".claude", "skills");
const targetDir = isProject ? projectSkillsDir : globalSkillsDir;
const targetSkillDir = join(targetDir, SKILL_NAME);

// Uninstall
if (isUninstall) {
  if (existsSync(targetSkillDir)) {
    rmSync(targetSkillDir, { recursive: true });
    console.log(`Removed ${SKILL_NAME} from ${targetDir}`);
  } else {
    console.log(`${SKILL_NAME} not found in ${targetDir}`);
  }
  process.exit(0);
}

// Verify source exists
if (!existsSync(SKILL_SOURCE)) {
  console.error(`Error: Skill source not found at ${SKILL_SOURCE}`);
  process.exit(1);
}

// Create target directory
mkdirSync(targetDir, { recursive: true });

// Remove existing installation
if (existsSync(targetSkillDir)) {
  rmSync(targetSkillDir, { recursive: true });
}

// Copy skill files
cpSync(SKILL_SOURCE, targetSkillDir, { recursive: true });

// Count installed files
const countFiles = (dir) => {
  let count = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      count += countFiles(join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
};

const fileCount = countFiles(targetSkillDir);
const scope = isProject ? "project" : "global";

console.log("");
console.log(`  Pictify skill installed (${scope})`);
console.log("");
console.log(`  ${fileCount} files -> ${targetSkillDir}`);
console.log("");
console.log("  The skill activates automatically when you ask Claude Code");
console.log("  to generate images using Pictify.");
console.log("");
console.log("  Get your API key at https://pictify.io/dashboard/api-tokens");
console.log("");
