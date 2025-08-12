const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
const { updateElectronApp } = require('update-electron-app')

updateElectronApp()


// const fs = require('node:fs')

// // Windows系统下配置全文件监听
// if (process.env.NODE_ENV !== 'production') {
//   // 获取当前项目根目录
//   const projectRoot = __dirname;
  
//   // 定义需要排除的目录（根据实际项目调整）
//   const excludeDirs = [
//     /\.vscode/,
//     /node_modules/,
//     /\.git/,
//     /dist/,
//     /out/,
//     /build/
//   ];

//   // 检查文件是否需要被监听
//   const shouldWatchFile = (filePath) => {
//     // 排除不需要监听的目录
//     return !excludeDirs.some(pattern => pattern.test(filePath));
//   };

//   // 配置热重载
//   require('electron-reloader')(module, {
//     // 监听渲染进程文件变化时自动刷新
//     watchRenderer: true,
//     // 自定义监听的文件/目录
//     paths: [projectRoot],
//     // 自定义文件过滤函数
//     filter: (filePath) => shouldWatchFile(filePath),
//     // 日志输出，方便调试
//     debug: true
//   });
// }

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')

  
}
app.whenReady().then(() => {

  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})