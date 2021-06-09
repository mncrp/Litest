var url=node.getSearch().link[node.getSearch().engine];
function go(){
  var elem=document.getElementsByTagName('input')[0].value;
  if (elem!=''){
    window.open(`${url}${elem}`);
  }
  return;
}

document.getElementsByTagName('input')[0].addEventListener('keyup',(e)=>{
  if(e.keyCode==13){
    go();
  } else {
    return false;
  }
});
