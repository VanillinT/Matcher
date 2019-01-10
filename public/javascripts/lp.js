function lp() {

	let dom = null;

	this.UI = function () {
		if(!dom) {
			dom = document.createElement('div')
			dom.id = 'launchpage';
		}
		return dom;
	}

}