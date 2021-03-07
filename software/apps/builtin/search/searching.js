//検索できる条件分岐
function openweb() {
  if (document.getElementById('searchform').value) {
    if (document.getElementById('searchform').value.length < 501) {
      location.href=`https://www.duckduckgo.com/?q=${document.getElementById('searchform').value}`;
    }
  }
}
