// waryu氏のも素晴らしいんだけど使い方難しい←
const {app} = require('electron');
const path = {
  config: `${app.getPath('userData')}/config.mncfg`,
  appList: `${app.getPath('userData')}/applist.mncfg`
};
const fs = require('fs');

module.exports = class {
  constructor() {
    if (!fs.existsSync(path.config)){
      fs.writeFileSync(
        path.config,
        fs.readFileSync(`${__dirname}/../default/config.mncfg`)
      );
    }
    if (!fs.existsSync(path.appList)){
      fs.writeFileSync(
        path.appList,
        fs.readFileSync(`${__dirname}/../default/applist.mncfg`)
      );
    }
  }

  get(name, property) {
    if (property)
      return JSON.parse(fs.readFileSync(path[name]))[property];
    else
      return JSON.parse(fs.readFileSync(path[name]));
  }
}
