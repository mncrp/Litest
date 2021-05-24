const {app, BrowserWindow, dialog, Menu, shell}=require('electron');
var mainWin;
var calcWin, searchWin, commandsWin, settingsWin;

function neWin(){
  mainWin=new BrowserWindow({
    width: 850, height: 550, minWidth: 450, minHeight: 200,
    backgroundColor: '#fff',
    icon: `${__dirname}/src/image/icon.png`,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration:false,
      contextIsolation: true,
      preload: `${__dirname}/src/script/node.js`
    }
  });
  mainWin.loadFile(`${__dirname}/src/index.html`);
  mainWin.on('closed',()=>{
    mainWin=null;
  })
}

app.on('ready', neWin);

app.on('window-all-closed',()=>{
  if(process.platform!=='darwin'){
    app.quit();
  }
});

app.on('activate',()=>{
  if(mainWin===null){
    neWin();
  }
})

let menu=Menu.buildFromTemplate([
  {
    label: '表示',
    submenu: [
      {
        label: 'Litestについて',
        accelerator: 'CmdOrCtrl+Alt+A',
        click: ()=>{
          dialog.showMessageBox(null, {
            type: 'info',
            icon: './src/image/icon.png',
            title: 'Litestについて',
            message: 'Litest 2.0.0 B3A1について',
            detail: 'バージョン: 2.0.0 B3A1(Beta 3 Alpha 1)\nビルド番号: Build2105.23\n\n開発者: Sorakime\n公式サイト: https://sorakime.github.io/mncr/litest/\nリポジトリ: https://github.com/Sorakime/litest/tree/beta3\n\nCopyright 2021 Sorakime.'
          })
        }
      },
      {
        type: 'separator'
      },
      {
        role: 'reload',
        label: '再読み込み',
      },
      {
        role: 'forceReload',
        label: 'より強い再読み込み'
      },
      {
        type: 'separator'
      },
      {
        label: '開発者向け',
        submenu: [
          {
            role: 'toggleDevTools',
            label: '開発者向けツール'
          },
          {
            label: 'ソースコードの確認',
            accelerator: 'CmdOrCtrl+Alt+S',
            click: ()=>{
              shell.openExternal('https://github.com/Sorakime/litest/tree/2.0b3a1')
            }
          }
        ]
      },
      {
        label: '拡大・縮小',
        submenu: [
          {
            role: 'zoomIn',
            label: '拡大',
            accelerator: 'CmdOrCtrl+^'
          },
          {
            role: 'zooomOut',
            label: '縮小',
            accelerator: 'CmdOrCtrl+-'
          },
          {
            role: 'resetZoom',
            label: '拡大率をリセット',
            accelerator: 'CmdOrCtrl+0'
          }
        ]
      },
      {
        role: 'togglefullscreen',
        label: '全画面で表示'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit',
        label: 'Litest を終了',
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  },
  {
    label: '編集',
    submenu: [
      {
        role: 'undo',
        label: '元に戻す'
      },
      {
        role: 'redo',
        label: 'やり直し'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut',
        label: 'カット'
      },
      {
        role: 'copy',
        label: 'コピー'
      },
      {
        role: 'paste',
        label: '貼り付け'
      },
      {
        type: 'separator'
      },
      {
        role: 'selectAll',
        label: 'すべて選択'
      }
    ]
  },
  {
    label: 'アプリ',
    submenu: [
      {
        label: 'Calc',
        accelerator: 'CmdOrCtrl+Alt+1',
        click: ()=>{
          calcWin=new BrowserWindow({
            width: 450, height: 538.25,
            backgroundColor: '#131313'
          })
          calcWin.loadFile(`./src/app/calc/index.html`);
        }
      },
      {
        label: 'Search',
        accelerator: 'CmdOrCtrl+Alt+2',
        click: ()=>{
          searchWin=new BrowserWindow({
            width: 800, height: 500,
            backgroundColor: '#888888'
          })
          searchWin.loadFile('./src/app/search/index.html');
        }
      },
      {
        label: 'Commands',
        accelerator: 'CmdOrCtrl+Alt+3',
        click: ()=>{
          commandsWin=new BrowserWindow({
            width: 750, height: 475,
            backgroundColor: '#111'
          })
          commandsWin.loadFile('./src/app/commands/index.html');
        }
      },
      {
        label: 'Settings',
        accelerator: 'CmdOrCtrl+Alt+4',
        click: ()=>{
          settingsWin=new BrowserWindow({
            width: 1000, height: 650,
            backgroundColor: '#888888'
          })
          settingsWin.loadFile('./src/app/settings/index.html');
        }
      }
    ]
  }
])
Menu.setApplicationMenu(menu);
