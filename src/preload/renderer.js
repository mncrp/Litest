const {contextBridge, ipcRenderer, webFrame} = require('electron');

contextBridge.exposeInMainWorld('node', {
	viewMonoStore: () => {
		ipcRenderer.invoke('viewMonoStore');
	},
	closeMonoStore: () => {
		ipcRenderer.invoke('closeMonoStore');
	}
});
