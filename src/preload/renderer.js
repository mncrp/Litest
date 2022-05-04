const {contextBridge, ipcRenderer, webFrame} = require('electron');
const fs = require('fs');
const axios = require('axios');

contextBridge.exposeInMainWorld('node', {
	viewMonoStore: () => {
		ipcRenderer.invoke('viewMonoStore');
	},
	closeMonoStore: () => {
		ipcRenderer.invoke('closeMonoStore');
	},
  moveStore: (id) => {
    ipcRenderer.invoke('moveStore', id);
  },
  doInstalled: () => {
    ipcRenderer.invoke('doInstalled');
  },
  installed: (userData) => {
    webFrame.executeJavaScript(`
      var softwares = {};
    `);
    let appList = JSON.parse(
      fs.readFileSync(
        `${userData}/applist.mncfg`,
        'utf-8'
      )
    );
    Object.keys(appList).forEach((item) => {
      axios.get(
        `http://soraki.me:8000/get/${item}`
      ).then((res) => {
        const data = JSON.parse(
          res.request.responseText
        );
        function isUpdate() {
          if (appList[item].release < data.build) {
            return true;
          } else {
            return false;
          }
        }
        webFrame.executeJavaScript(`
          softwares['${item}'] = new Software(
            '${data.title}',
            '${data.version}',
            ${data.build},
            '${item}',
            '${data.binary.icon}',
            ${isUpdate()}
          );
        `);
      }).catch((err) => {
        console.log(err);
      });
    });
  }
});
