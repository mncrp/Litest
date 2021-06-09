let name=[
  ['DuckDuckGo', 'https://www.duckduckgo.com/?q='],
  ['Google', 'https://www.google.com/search?q='],
  ['Yahoo! Japan', 'https://.yahoo.co.jp/search?q='],
  ['Bing', 'https://www.bing.com/search?q=']
]
var elem=document.getElementsByTagName('search-settings')[0];

var el=`<select>`;

name.forEach((i,t) => {
  el=`${el}<option value="${name[t][0]}">${name[t][0]}</option>`
});

elem.innerHTML=`${elem.innerHTML}${el}</select>`;
var selEl=document.querySelector('search-settings select');

switch (node.getSearch().engine) {
  case 'DuckDuckGo':
    selEl.options[0].selected=true;
    break;
  case 'Google':
    selEl.options[1].selected=true;
    break;
  case 'Yahoo! Japan':
    selEl.options[2].selected=true;
    break;
  case 'Bing':
    selEl.options[3].selected=true;
    break;
  default:
}

selEl.addEventListener('change',()=>{
  node.writeSearch(selEl.value);
})
