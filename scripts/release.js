const { execSync } = require('child_process');
const fs = require('fs');

try {
  // 1. 获取 package.json 中的 version
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const version = pkg.version;

  console.log(`📦 开始发布版本 v${version} ...`);

  // 2. Git add
  execSync('git add .', { stdio: 'inherit' });

  // 3. Git commit
  execSync(`git commit -m "v${version}"`, { stdio: 'inherit' });

  // 4. 推送到 main 分支
  execSync('git push -u origin main', { stdio: 'inherit' });

  // 5. 运行 electron-forge publish
  execSync('electron-forge publish', { stdio: 'inherit' });

  console.log('✅ 发布完成！');
} catch (err) {
  console.error('❌ 发布失败：', err.message);
  process.exit(1);
}
