const {BrowserWindow, contextBridge, dialog}=require('electron');
const fs=require('fs');

contextBridge.exposeInMainWorld(
  "node", {
    showInit: ()=>{
      let el=``;
    },
    getBack: ()=>{
      let file=fs.readFileSync(`${__dirname}/../../config/config.json`, 'utf-8');
      let obj=JSON.parse(file);
      return obj;
    },
    get__dirname: ()=>{
      return __dirname;
    },
    writeBack: (name)=>{
      fs.writeFileSync(`${__dirname}../../../config/config.json`,`{\n  "background": "${name}"\n}`);
    }
  }
)
