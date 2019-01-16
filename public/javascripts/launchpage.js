function launchpage() {

	let dom = null;

	this.UI = function () {
		if(!dom) {
			dom = document.createElement('div')
			dom.id = 'launchpage';
		}
		return dom;
	};

	this.putInto = (parent) => {
		parent.replaceChild(dom, parent.firstChild)
	};

}