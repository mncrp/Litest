/*
argument: {
  menu: [
    {
      id: 'menuId0',
      display: 'メニューの表示名1'
    },
    {
      id: 'menuId1',
      display: 'メニューの表示名2'
    }
  ]
}

Array.forEach((item, i) => {
  item === Array[i];
})
*/

let elementalVerticalNum = 0;

class ElementalVertical {
  constructor(content) {
    this.content = content;
    Object.keys(content).forEach((item, i) => {
      this.content[i].frameSrc = `./contents/${content[i].id.toLowerCase()}.html`;
    });
    document.head.innerHTML = `
      ${document.head.innerHTML}
      <link rel="stylesheet" href="./style/elemental-vertical.css">
    `
  }

  generateHTML() {
    let menus = '';
    Object.keys(this.content).forEach((item, i) => {
      if (i === 0) {
        menus = `
          <a href="${this.content[i].frameSrc}" id="clicked" target="frame" onclick="javascript:changeClickedMenu(${elementalVerticalNum}, ${i})">
            ${this.content[i].display}
          </a>
        `
      } else {
        menus = `
          ${menus}
          <a href="${this.content[i].frameSrc}" target="frame" onclick="javascript:changeClickedMenu(${elementalVerticalNum}, ${i})">
            ${this.content[i].display}
          </a>
        `;
      }
    });

    let html = `
      <div class="elemental-vertical-wrapper">
        <nav class="elemental-vertical-navigation">
          ${menus}
        </nav>
        <iframe name="frame" class="elemental-vertical-frame" src="${this.content[0].frameSrc}"></iframe>
      </div>
    `;
    return html;
  }
}

function changeClickedMenu(verticalId, menuId) {
  let elementalVerticalTopElement = document.getElementsByClassName('elemental-vertical-wrapper')[verticalId];
  document.querySelector(
    `.elemental-vertical-wrapper #clicked`
  ).removeAttribute('id');
  document.querySelector(
    `.elemental-vertical-wrapper a:nth-child(${menuId + 1})`
  ).setAttribute('id', 'clicked');
}
