const {
  app,
  BrowserWindow,
  BrowserView,
  Menu,
  nativeImage,
  ipcMain,
  webFrameMain
} = require('electron');
const path = require('path');
const directory = `${__dirname}/..`;
const Config = require(`${directory}/proprietary/lib/config.js`);
let win, monoStore;
const isMac = process.platform === 'darwin';

function nw() {
  win = new BrowserWindow({
    width: new Config().get('width'),
    height: new Config().get('height'),
    minWidth: 600,
    minHeight: 260,
    icon: nativeImage.createFromPath(`${directory}/image/icon.png`),
    webPreferences: {
      preload: `${directory}/preload/renderer.js`,
      nodeIntegrationInSubFrames: true
    }
  });
  win.loadFile(`${directory}/renderer/index.html`);
  win.webContents.on(
    'did-frame-navigate',
    (e,
     url,
     httpResponseCode,
     httpStatusText,
     isMainFrame,
     frameProcessId,
     frameRoutingId) => {
      const frame = webFrameMain.fromId(frameProcessId, frameRoutingId);
      const frameSrc = path.posix.join(frame.url)
      const softwareTabSrc = path.posix.join(`${directory}/renderer/contents/software.html`)
      // これがiframeでsoftwareを表示しているなら
      if (frameSrc === 'file:' + softwareTabSrc) {
        frame.on('dom-ready', () => {
          frame.executeJavaScript(`
            if (location.href === 'file://${softwareTabSrc}') {
              softwares.litest.changeUpdateExists(false);
            }
          `);
        })
      }
  })
  monoStore = new BrowserView({
    webPreferences: {
      preload: `${directory}/preload/store.js`
    }
  });
  monoStore.webContents.loadURL('https://www.monochrome.tk');
  win.on('closed', () => {
    win = null;
  });
}

ipcMain.handle('viewMonoStore', () => {
  win.addBrowserView(monoStore);
  monoStore.setBounds({
    width: win.getContentSize()[0] - 200,
    height: win.getContentSize()[1],
    x: 200,
    y: 0
  });
  monoStore.setAutoResize({
    width: true,
    height: true
  })
});
ipcMain.handle('closeMonoStore', () => {
  win.removeBrowserView(monoStore);
})

app.on('ready', nw);
app.on('activate', () => {
  if (win === null) nw();
});
app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});
