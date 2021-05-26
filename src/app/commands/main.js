//コマンド集
document.addEventListener('keydown', (e)=>{
  if (e.keyCode==13) {
    var inp=document.createElement('input');
    //解析
    if (document.querySelector('input:not([disabled])').value) {
      const qu=document.querySelector('input:not([disabled])').value.split(' ');
      //入力されていた場合
      switch (qu[0].toLowerCase()) {
        case 'search': //検索
          var qu2=document.querySelector('input:not([disabled])').value.slice(6);
          window.open(`https://duckduckgo.com/?q=${qu2}`);
          break;
        case 'open': //urlを開く
          var qu2=document.querySelector('input:not([disabled])').value.slice(5);
          window.open(qu2);
          break;
        case 'clear':
          location.reload(true);
          break;
        case 'quit':
          window.close();
          break;
        case 'help':
          document.body.appendChild(document.createElement('input'));
          document.querySelector('input:not([disabled])').setAttribute('data-byPrompt','');
          document.querySelector('input:not([disabled])').setAttribute('disabled','')
          document.querySelector('input:not([disabled])').value='Sorry, not ready.';
          break;
        case 'time':
          document.body.appendChild(document.createElement('input'));
          document.querySelector('input:not([disabled])').setAttribute('data-byPrompt','');
          document.querySelector('input:not([disabled])').setAttribute('disabled','')
          document.querySelector('input:not([disabled])').value=new Date();
          break;
        case 'timeutc':
          document.body.appendChild(document.createElement('input'));
          document.querySelector('input:not([disabled])').setAttribute('data-byPrompt','');
          document.querySelector('input:not([disabled])').setAttribute('disabled','')
          document.querySelector('input:not([disabled])').value=new Date().toUTCString();
          break;
        case 'exit':
          window.close();
          break;
        case 'hello':
          document.body.appendChild(document.createElement('input'));
          document.querySelector('input:not([disabled])').setAttribute('data-byPrompt','');
          document.querySelector('input:not([disabled])').setAttribute('disabled','')
          document.querySelector('input:not([disabled])').value=`Hello. now time is ${new Date()}. UTC date is`;
          break;
        default:
          document.body.appendChild(document.createElement('input'));
          document.querySelector('input:not([disabled])').setAttribute('disabled','')
          document.querySelector('input:not([disabled])').value=`Sorry, "${qu[0]}" command is not found.`;
          break;
      }
    }

    document.querySelector('input:not([disabled])').setAttribute('disabled', '');
    document.body.appendChild(inp);
    document.querySelector('input:not([disabled])').focus();
  }
});

//矢印キー
//memo ←:37 ↑:38, →:39 ↓:40
document.addEventListener('keydown',(e)=>{
  switch (e.keyCode) {
    case 38:
      document.querySelector('input:not([disabled])').value=document.querySelector('input:nth-last-child(3)').value;
      break;
    default:
      return false;
  }
});
