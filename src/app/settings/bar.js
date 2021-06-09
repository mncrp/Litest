function select(arg){
  switch (arg) {
    case 0:
      document.querySelector('#on').removeAttribute('id');
      document.querySelector('aside>div:nth-child(1)').setAttribute('id','on');
      document.querySelector('#viewing').removeAttribute('id');
      document.getElementsByTagName('general-settings')[0].setAttribute('id','viewing')
      break;
    case 1:
      document.querySelector('#on').removeAttribute('id');
      document.querySelector('aside>div:nth-child(3)').setAttribute('id','on');
      document.querySelector('#viewing').removeAttribute('id');
      document.getElementsByTagName('search-settings')[0].setAttribute('id','viewing');
      break;
    default:
      return false;
  }
}
