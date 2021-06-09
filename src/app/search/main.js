var url=node.getSearch().link[node.getSearch().engine];
console.log(url);

function go(){
  var elem=document.getElementsByTagName('input')[0].value;
  if (elem!=''){
    window.open(`${url}${elem}`);
  }
  return;
}

document.addEventListener('keyup',(e)=>{
  if(e.keyCode==13){
    go();
  } else {
    return false;
  }
});
