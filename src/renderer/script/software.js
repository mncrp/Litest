function updateBtn(isExists) {
	if (isExists) {
		return `
			<div class="one-software-update">
				<a href="">更新</a>
			</div>`;
	} else {
		return '';
	}
}

class Software {
	constructor(softwareTitle,
							softwareVersion,
							softwareId,
							updateExists) {
		this.title = softwareTitle;
		this.version = softwareVersion;
		this.id = softwareId;
		this.updateExists = updateExists;
		this.html = `
			${document.body.innerHTML}
			<div class="one-software" id="${softwareId}">
				<div class="one-software-image"></div>
				<div class="one-software-detail">
					<h1>${this.title}</h1>
					<h6>${this.version}</h6>
				</div>
				${updateBtn(this.updateExists)}
			</div>
		`;
		document.body.innerHTML = this.html;
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
}

let softwares = {
	litest: new Software('Litest by monochrome.',
											 'v.2.0.0',
											 'litest-by-monochrome',
											 true)
};
