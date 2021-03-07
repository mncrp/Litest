const dow=new Array('日','月','火','水','木','金','土');//曜日の定義
setInterval(function () {
  const time=new Date();//時間取得
  var min=time.getMinutes();//秒
  if (time.getMinutes()<10) {min='0'+time.getMinutes();}//秒数が一桁の場合に0をくっつける
  document.getElementsByTagName('time')[0].innerHTML=(time.getMonth()+1)+'月'+time.getDate()+'日('+dow[time.getDay()]+')  '+time.getHours()+':'+min;//表示for右上
  document.getElementsByTagName('time')[1].innerHTML=(time.getMonth()+1)+'月'+time.getDate()+'日('+dow[time.getDay()]+'曜日)  '+time.getHours()+':'+min;//表示forタイムビューウィンドウ
}, 560);
function timeview(viewing) { //表示したり諸々と・・・
  if (viewing=='big') {
    document.getElementsByTagName('timeview-window')[0].setAttribute('class','viewing');
    document.getElementsByTagName('time')[0].setAttribute('onclick',"timeview('small')");
  } else if (viewing=='small') {
    document.getElementsByTagName('timeview-window')[0].removeAttribute('class');
    document.getElementsByTagName('time')[0].setAttribute('onclick',"timeview('big')");
  }
}
