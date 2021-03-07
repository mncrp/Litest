function utc(){
  const cl=new Date().toUTCString();
  document.getElementsByTagName('time')[1].innerHTML=cl;
}
function now() {
  const cl=new Date();
  const day=['日','月','火','水','木','金','土'];
  var min;
  if (cl.getMinutes()<10){cl.min=`0${cl.getMinutes()}`}else{cl.min=cl.getMinutes()}
  if (cl.getSeconds()<10){cl.sec=`0${cl.getSeconds()}`}else{cl.sec=cl.getSeconds()}
  const view=`${cl.getFullYear()}年${cl.getMonth()+1}月${cl.getDate()}日 ${day[cl.getDay()]}曜日 ${cl.getHours()}:${cl.min}:${cl.sec}`;
  document.getElementsByTagName('time')[0].innerHTML=view;
}
setInterval(utc, 10);
setInterval(now, 10);
