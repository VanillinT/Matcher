//pug ./dup_viewmode_ui.pug -c -n dup_viewmode_ui -D -o ../public/jsviews

function dup_viewmode() {

	let dom = null;

	let initialized = false;

	let rows = [];

	this.UI = function (data) {
		if (!dom) {
			dom = document.createElement('div');
			dom.innerHTML = dup_viewmode_ui(data);
			dom.id = 'viewmode';
		}
		return dom;
	};

	this.putInto = (parent) => {
		parent.replaceChild(dom, parent.firstChild);
		init();
	};


	let init = () => {
		if (initialized) return;

		$('tr').hover(function () {
			$('#controls_for_' + $(this).prop('id')).removeClass('d-none').addClass('d-inline-block');
		}, function () {
			$('#controls_for_' + $(this).prop('id')).removeClass('d-inline-block').addClass('d-none');
		});

		initialized = true;
	};
}
