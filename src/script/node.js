const {BrowserWindow, contextBridge, dialog}=require('electron');
const fs=require('fs');

contextBridge.exposeInMainWorld(
  "node", {
    getBack: ()=>{
      let file=fs.readFileSync(`${__dirname}/../../config/config.json`, 'utf-8');
      let obj=JSON.parse(file);
      return obj;
    },
    get__dirname: ()=>{
      return __dirname;
    },
    writeBack: (name)=>{
      let file=fs.readFileSync(`${__dirname}/../../config/config.json`, 'utf-8');
      let obj=JSON.parse(file);
      obj.background=name;
      fs.writeFileSync(`${__dirname}../../../config/config.json`,JSON.stringify(obj));
    },
    ver: (type)=>{
      if(type=='vershort'){
        return '2.0.0';
      }else if(type='ver'){
        return 'Litest ver.2.0.0';
      }else if(type='ba'){
        return 'B3A2';
      }else if(type='Ba'){
        return 'Beta 3 Alpha 2';
      }else if(type=='full'){
        return 'Litest ver.2.0.0 Beta 3 Alpha 2';
      }else if (type=='build'){
        return '12';
      }
    },
    getSearch: ()=>{
      let file=fs.readFileSync(`${__dirname}/../../config/config.json`,'utf-8');
      let obj=JSON.parse(file);
      return obj.search;
    },
    writeSearch: (name)=>{
      let file=fs.readFileSync(`${__dirname}/../../config/config.json`, 'utf-8');
      let obj=JSON.parse(file);
      obj.search.engine=name;
      fs.writeFileSync(`${__dirname}../../../config/config.json`,JSON.stringify(obj));
    }
  }
)
