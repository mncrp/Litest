document.querySelector('dock-bar>div#openLocker').addEventListener('click',()=>{
  document.getElementsByTagName('dock-bar')[0].setAttribute('id','opened');
})
document.querySelector('dock-bar>div#closeLocker').addEventListener('click',()=>{
  document.getElementsByTagName('dock-bar')[0].removeAttribute('id');
})
document.querySelector('app-icon[data-name="calc"]').addEventListener('click',()=>{
  window.open(`file://${node.get__dirname()}/../app/calc/index.html`,'calc','width=450,height=535,resizable=no');
})
document.querySelector('app-icon[data-name="search"]').addEventListener('click',()=>{
  window.open(`file://${node.get__dirname()}/../app/search/index.html`,'search','width=800,height=500');
})
document.querySelector('app-icon[data-name="commands"]').addEventListener('click',()=>{
  window.open(`file://${node.get__dirname()}/../app/commands/index.html`,'commands','width=750,height=475');
})
document.querySelector('app-icon[data-name="settings"]').addEventListener('click',()=>{
  window.open(`file://${node.get__dirname()}/../app/settings/index.html`,'settings','width=1000,height=650');
})

function openTime(){
  document.getElementsByTagName('time-dialog')[0].style.display='block';
  document.getElementsByTagName('time-el')[0].setAttribute('onclick','closeTime();');
}
function closeTime(){
  document.getElementsByTagName('time-dialog')[0].style.display='none';
  document.getElementsByTagName('time-el')[0].setAttribute('onclick','openTime();');
}
