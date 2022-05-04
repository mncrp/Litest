class Software {
	constructor(
    softwareTitle,
    softwareVersion,
    release,
    softwareId,
    icon,
    updateExists
  ) {
    function updateBtn(isExists) {
      if (isExists) {
        return `
          <div class="one-software-update">
            <a href="">更新</a>
          </div>
        `;
      } else {
        return '';
      }
    };
		this.title = softwareTitle;
		this.version = softwareVersion;
    this.release = release;
		this.id = softwareId;
    this.icon = icon;
		this.updateExists = updateExists;
		let textHtml = `
			${document.body.innerHTML}
			<div class="one-software" id="${softwareId}">
				<div class="one-software-image" style="background-image: url('${this.icon}');"></div>
				<div class="one-software-detail">
					<h1>${this.title}</h1>
					<h6>${this.version}</h6>
				</div>
				${updateBtn(this.updateExists)}
			</div>
		`;
    try {
      document.body.innerHTML = textHtml;
    } catch(e) {
      return true;
    }
	}

	changeUpdateExists(isUpdateExists) {
		this.updateExists = isUpdateExists;
		if (isUpdateExists === true) {
			document.getElementById(this.id).innerHTML = `
				${document.getElementById(this.id).innerHTML}
				${updateBtn(true)}
			`;
		} else {
			document.getElementById(this.id)
				.getElementsByClassName('one-software-update')[0]
				.remove();
		}
	}
};

node.doInstalled();
