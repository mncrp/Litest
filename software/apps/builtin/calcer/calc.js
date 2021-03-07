var inputdata=''; //入力中

function forinput(num) {
  if (num==undefined) {
    return false;
  }
  inputdata=inputdata+num; //文字列追加
  document.getElementsByTagName('calc-output')[0].innerHTML=inputdata; //表示
}

function forerase(type) { //消す方のね。
  switch (type) {
    case 'all':
      //全部消す場合discard関数実行
      discard();
      break;
    case 'owt': //一つだけ消すやつ
      inputdata=inputdata.slice(0, -1); //inputdataの後ろを一つけす
      document.getElementsByTagName('calc-output')[0].innerHTML=inputdata; //表示も反映させる
      break;
  }
}

function discard() { //削除っ！
  inputdata=''; //変数の初期化
  document.getElementsByTagName('calc-output')[0].innerHTML=''; //表示させる
}

function math() {
  let calc=[new Function(`return ${inputdata}`), document.getElementsByTagName('calc-output')[0].innerHTML];
  document.getElementsByTagName('calc-output')[0].innerHTML=`${calc[1]}=${calc[0]()}`;
  inputdata=calc[0]();
}
