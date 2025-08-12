#!/usr/bin/env node

const { execSync } = require("child_process");

function run(cmd) {
  return execSync(cmd, { stdio: "pipe" }).toString().trim();
}

console.log("🔍 开始检查发布环境...\n");

// 1. 检查 GITHUB_TOKEN
if (!process.env.GITHUB_TOKEN) {
  console.error("❌ 没有检测到 GITHUB_TOKEN 环境变量，请先执行：");
  console.error('   Windows: setx GITHUB_TOKEN "你的token"');
  console.error('   Mac/Linux: export GITHUB_TOKEN="你的token"');
  process.exit(1);
}
console.log("✅ 检测到 GITHUB_TOKEN");

// 2. 检查是否是 git 仓库
try {
  run("git rev-parse --is-inside-work-tree");
  console.log("✅ 当前目录是 Git 仓库");
} catch {
  console.error("❌ 当前目录不是 Git 仓库，请先执行：git init");
  process.exit(1);
}

// 3. 检查是否有远程仓库
try {
  const remote = run("git remote -v");
  if (!remote) throw new Error();
  console.log("✅ 检测到远程仓库:", remote.split("\n")[0]);
} catch {
  console.error("❌ 没有检测到远程仓库，请先执行：git remote add origin <repo-url>");
  process.exit(1);
}

// 4. 检查是否有未提交更改
try {
  const status = run("git status --porcelain");
  if (status) {
    console.warn("⚠ 检测到有未提交的更改，将在发布前自动提交。");
  } else {
    console.log("✅ 没有未提交更改");
  }
} catch {
  console.error("❌ 检查 git 状态失败");
  process.exit(1);
}

console.log("\n🎯 发布环境检查通过，可以执行发布任务。\n");
