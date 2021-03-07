const {app, Menu, dialog, BrowserWindow}=require('electron');
const {resolve}=require('path');
let mainWindow, docsWindow;

function newWindow(){
  mainWindow=new BrowserWindow({
    width: 1000, height: 600,
    useContentSize: true,
    minWidth: 500, minHeight: 300,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile('software/index.html');

  mainWindow.on('closed',()=>{mainWindow=null;})
}

app.on('ready',newWindow);

//for macOS
app.on('window-all-closed',()=>{if(process.platform!=='darwin'){app.quit();}})

app.on('activative',()=>{if(mainWindow===null){newWindow();}})

var dia=()=>{
  dialog.showMessageBox({
    type: 'info',
    title: 'Litestについて',
    message: 'Litest v.2.0 Beta2 Build2103.01',
    detail: 'Made by Sorakime. Copyright 2021 Sorakime.',
    buttons: ['OK'],
    /*icon: resolve(__dirname, '/software/image/logo.png');

    applicationName: 'Litest',
    applicationVersion: 'Ver. 2.0 Beta2',
    copyright: 'Copyright 2021 Sorakime',
    version: 'Build2103.01',
    credits: 'It was Built Electron',
    authors: ['Sorakime'],
    website: 'https://sorakime.github.io/mncr/litest',
    iconPath: 'software/image/logo.png'*/
})}

var template=[{
  label: '操作',
  submenu: [{label: 'Litestについて', accelerator: 'CmdOrCtrl+F1', click: dia},{
    role: 'separator'
  },{
    label: '再読み込み',
    accelerator: 'CmdOrCtrl+R',
    click(item, focusedWindow){if(focusedWindow)focusedWindow.reload();}
  },{
    label: '終了',
    accelerator: 'CmdOrCtrl+Q',
    click(item, focusedWindow){if(focusedWindow)focusedWindow.close();}
  }]},{
  label: '開発',
  submenu: [{
    label: '開発者向けツール',
    accelerator: 'Alt+F12',
    click(item, focusedWindow){if(focusedWindow){
      if(focusedWindow.webContents.isDevToolsFocused()!=true){
        focusedWindow.webContents.openDevTools();
      }else{
        focusedWindow.webContents.closeDevTools();
      }
    }}
  }]},{
    label: 'ヘルプ',
    submenu: [{
      label: 'ホームページ',
      click(item, fw){
        docsWindow=new BrowserWindow({width: 900, height: 500})
        docsWindow.loadURL('https://sorakime.github.io/mncr/litest');
      }},{
      label: 'GitHub',
      click(item, fw){
        docsWindow=new BrowserWindow({width: 900, height: 500})
        docsWindow.loadURL('https://github.com/Sorakime/Litest');
      }},{
      label: '更新を確認する(Ver.2.0 Beta2)',
      click(item, fw){
        docsWindow=new BrowserWindow({width: 900, height: 500})
        docsWindow.loadURL('https://github.com/Sorakime/Litest/releases');
    }}]
  }
]
var menu=Menu.buildFromTemplate(template);

Menu.setApplicationMenu(menu);
