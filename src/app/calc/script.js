var num='';

function output(){
  document.getElementsByTagName('calc-output')[0].innerText=num;
}

function forinput(numb){
  let inputed=numb;
  num=num+inputed;
  output();
}

function forerase(scale){
  if(scale='owt'){
    num=num.slice(0, -1);
  } else if(scale='all'){
    num='';
  }
  output();
}

function math(){
  let result=new Function('return '+num);
  num=result();
  output();
}
