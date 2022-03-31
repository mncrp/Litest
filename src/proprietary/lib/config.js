// waryu氏のも素晴らしいんだけど使い方難しい←
const {app} = require('electron');
const confDir = `${app.getPath('userData')}/config.mncfg`;
const fs = require('fs');

module.exports = class {
  constructor() {
    if (!fs.existsSync(confDir)){
      fs.writeFileSync(
        confDir,
        fs.readFileSync(`${__dirname}/../default/config.mncfg`)
      );
    }
  }

  get(property) {
    if (property)
      return JSON.parse(fs.readFileSync(confDir))[property];
    else
      return JSON.parse(fs.readFileSync(confDir));
  }
}
