var fs=require('fs');

window.node.readFile=(path, encord)=>{
  let txt=new String();
  if(fileExist(path)){
    if(encord=undefined){
      txt=fs.readFileSync(path, 'utf-8');
    }else if(encord!=undefined){
      txt=fs.readFileSync(path, encord);
    }
    return txt;
  }
}

window.node.fileExist=(path)=>{
  let exist=false;
  try{
    fs.statSync(path);
    exist=true;
  }catch(e){
    exist=false;
  }
  return exist;
}
