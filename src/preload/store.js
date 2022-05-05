const {contextBridge, ipcRenderer, webFrame} = require('electron');
const fs = require('fs');
let path, id;
const platform = (() => {
  const os = process.platform;
  if (os === 'darwin') return 'macOS';
  if (os === 'win32') return 'windows';
  if (os === 'linux') return 'linux';
})();

ipcRenderer.on('button', (e, userData, softwareId) => {
  path = userData;
  id = softwareId;
  webFrame.executeJavaScript(`
    const userData = '${userData}';
    try{
      if(binaryUrl !== undefined) {
        node.button(binaryUrl);
      }
    } catch(e) {
      console.log(e);
    }
  `);
});

contextBridge.exposeInMainWorld('node', {
  button: (url) => {
    const appList = JSON.parse(
      fs.readFileSync(
        `${path}/applist.mncfg`,
        'utf-8'
      )
    );
    if (appList[id] === undefined) {
      webFrame.executeJavaScript(`
        document.getElementById('details-data').innerHTML = \`
          \${document.getElementById('details-data').innerHTML}
          <div onclick="node.install(binaryUrl)" id="install-btn">入手</div>
        \`;
      ` );
    } else {
      webFrame.executeJavaScript(`
        document.getElementById('details-data').innerHTML = \`
          \${document.getElementById('details-data').innerHTML}
          <div onclick="node.moveToSoftwares()" id="install-btn">移動</div>
        \`;
      ` );
    }
    webFrame.insertCSS(`
      #install-btn {
        /* position */
        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);

        padding: 8px 10px;
        background-color: #7ad5;
        border-radius: 15px;
        box-shadow: 0 0 0 #0000;
        border: 1px solid #ddd0;

        transition: all 0.2s ease-in-out;
      }
      #install-btn:is(:hover, :focus) {
        background-color: #7ad8;
        box-shadow: 5px 5px 10px #bfbfbf55;
        border: 1px solid #ddde;
      }
    `);
  },
  moveToSoftwares: () => {
    ipcRenderer.invoke('closeMonoStore');
    ipcRenderer.invoke('moveToSoftwares');
  },
  install: (binaryUrl) => {
    // asarをDL
    const outFile = fs.createWriteStream(`${path}/software.dat`);
    function downloaded() {
      //const asar = require('asar');
      //await asar.create
    }
    if (binaryUrl.indexOf('https://') === 0) {
      const request = require('https').get(binaryUrl, (res) => {
        res.pipe(outFile);
        res.on('end', () => {
          outFile.close();
          downloaded();
        })
      });
      request.on('err', (e) => {
        alert('エラーが発生しました \n', e);
        return false;
      });
    } else if (binaryUrl.indexOf('http://') === 0) {
      const request = http.get(binaryUrl, (res) => {
        res.pipe(outFile);
        res.on('end', () => {
          outFile.close();
          downloaded();
        })
      });
      request.on('err', (e) => {
        alert('エラーが発生しました \n', e);
        return false;
      });
    } else {
      alert('エラーが発生しました？');
    }

    // asarをそのプラットフォーム用にビルド
    // ここの処理をどうすればいいのかがわからん
  }
});
