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
new Config();

function nw() {
  win = new BrowserWindow({
    width: new Config().get('config', 'width'),
    height: new Config().get('config', 'height'),
    minWidth: 600,
    minHeight: 260,
    icon: nativeImage.createFromPath(`${directory}/image/icon.png`),
    webPreferences: {
      preload: `${directory}/preload/renderer.js`,
      nodeIntegrationInSubFrames: true
    }
  });
  win.loadFile(`${directory}/renderer/index.html`);
  win.webContents.on('did-frame-navigate',
    (
      e, url, isMain, httpResponseCode, httpStatusText, frameProcessId, frameRoutingId
    ) => {
      console.log(frameProcessId, frameRoutingId);
      webFrameMain.fromId(frameProcessId, frameRoutingId).executeJavaScript(`
        try {
          const userData = '${app.getPath('userData')}';
          node.installed(userData);
        } catch(e) {
          console.log(e);
        }
      `);
    }
  );

  // monoStore
  monoStore = new BrowserView({
    webPreferences: {
      preload: `${directory}/preload/store.js`
    }
  });
  monoStore.webContents.on('dom-ready', () => {
    let url = new URL(monoStore.webContents.getURL());
    if (url.hostname === 'soraki.me') {
      monoStore.webContents.send(
        'button',
         app.getPath('userData'),
         url.pathname.split('/')[2]
      );
    }
  });
  monoStore.webContents.toggleDevTools();

  win.on('closed', () => {
    win = null;
  });
  monoStore.webContents.loadURL('http://soraki.me:8000/');
}

ipcMain.handle('viewMonoStore', () => {
  win.addBrowserView(monoStore);
  monoStore.setBounds({
    width: win.getContentSize()[0] - 200,
    height: win.getContentSize()[1] - 40,
    x: 200,
    y: 40
  });
  monoStore.setAutoResize({
    width: true,
    height: true
  });
});
ipcMain.handle('closeMonoStore', () => {
  win.removeBrowserView(monoStore);
});
ipcMain.handle('button', (e, url) => {
  console.log(url);
});
ipcMain.handle('moveStore', (e, id) => {
  monoStore.webContents.loadURL(`http://soraki.me:8000/software/${id}`);
});
ipcMain.handle('moveToSoftwares', () => {
  win.webContents.executeJavaScript(`
    changeClickedMenu(0, 1);
    document.getElementsByClassName('elemental-vertical-frame')[0].src = "./contents/software.html";
  `);
});

app.on('ready', nw);
app.on('activate', () => {
  if (win === null) nw();
});
app.on('window-all-closed', () => {
  if (!isMac) app.quit();
});
