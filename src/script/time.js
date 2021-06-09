setInterval(()=>{
  let now=new Date();
  let date=()=>{
    if(now.getDate()<10){
      return '0'+now.getDate();
    }
    return now.getDate();
  }
  let minutes=()=>{
    if(now.getMinutes()<10){
      return '0'+now.getMinutes();
    }
    return now.getMinutes();
  }
  let seconds=()=>{
    if (now.getSeconds()<10) {
      return '0'+now.getSeconds();
    }
    return now.getSeconds();
  }
  let d=`${now.getFullYear()}年${now.getMonth()+1}月${date()}日(${['日','月','火','水','木','金','土'][now.getDay()]})`;
  let t=`${now.getHours()}:${minutes()}`;
  document.querySelector('date-el').innerHTML=d;
  document.getElementsByTagName('time-el')[0].innerHTML=t;
  document.getElementsByTagName('time-el')[1].innerHTML=t+'.'+seconds();
}, 515);
