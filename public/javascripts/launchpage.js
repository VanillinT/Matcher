function launchpage() {

	let dom = null,

		buildUI = () => {
			dom = document.createElement('div')
			dom.id = 'launchpage';
			return dom;
		},
		init = () => {

		};

	this.putInto = (target) => {
		if (!dom) buildUI();
		target.children(':first').replaceWith(dom);
		init();
	};

}