function statuspage() {

	let dom = null,

		buildUI = () => {
			dom = document.createElement('div')
			dom.id = 'statuspage';

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