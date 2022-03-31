const ui = new ElementalVertical([
  {
    id: 'home',
    display: 'ホーム'
  },
  {
    id: 'software',
    display: 'ソフトウェア'
  },
  {
    id: 'store',
    display: 'ストア'
  }
])

document.getElementById('ui').innerHTML = ui.generateHTML();
