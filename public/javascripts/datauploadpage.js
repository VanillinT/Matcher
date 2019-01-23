//pug ./dup_ui.pug -c -n dup_ui -D -o ../public/jsviews
function datauploadpage(params) {

	let dom = null;
	let container = () => $('#dup_container')[0];

	let dup_up = new dup_upmode();

	let dup_view = null;

	let currentMode = 'up';

	let initialized = false;

	this.UI = function () {
		if(!dom) {
			dom = document.createElement('div');
			dom.innerHTML = dup_ui(params);
			dom.id = 'datauploadpage';
		}
		return dom;
	};

	this.putInto = (parent) => {
		parent.replaceChild(dom, parent.firstChild);
		init();
	};

	let toggleMode = () => {
		switch (currentMode) {
			case 'up':
				dup_view.putInto(container());
				currentMode = 'view';
				$('#btn_upload').hide();
			break;
			case 'view':
				dup_up.putInto(container());
				currentMode = 'up';
				$('#btn_upload').show();
			break;
		}
	};

	let init = () => {
		if(initialized) return;

		dup_up.UI();

		$.ajax('/getAppContent', {
			type: 'get',
			success: function (res) {
				dup_view = new dup_viewmode();
				dup_view.UI(res);
				dup_up.onupload = dup_view.refresh;
				toggleMode();
			}
		});

		$('#dup_container').height($(document).outerHeight() - $('#footer').outerHeight() - $('#pagetoggles').outerHeight());

		$('#modetoggles input[type="radio"]').change(function () {
			if ($(this).is(':checked')) {
				toggleMode();
			}
		});

		initialized = true;
	};
}