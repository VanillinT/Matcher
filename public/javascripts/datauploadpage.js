//pug ./dup_ui.pug -c -n dup_ui -D -o ../public/jsviews
function datauploadpage(params) {

	let dom = null,

		container = () => $('#dup_container'),

		dup_up = new dup_upmode(),

		dup_view = null,

		currentMode = 'up',

		toggleMode = () => {
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
		},

		init = () => {

			$.ajax('/getAppContent', {
				type: 'get',
				success: function (res) {
					if(dup_view) return;
					dup_view = new dup_viewmode(res);
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

		},

		buildUI = () => {
			dom = $(dup_ui(params));
			dom.id = 'datauploadpage';
		};

	this.putInto = (target) => {
		if (!dom) buildUI();
		$.when(target.children(':first').replaceWith(dom)).then(init);
	};
}