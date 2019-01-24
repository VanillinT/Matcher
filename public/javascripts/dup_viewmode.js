//pug ./dup_viewmode_ui.pug -c -n dup_viewmode_ui -D -o ../public/jsviews
//pug ./dup_viewmode_modal.pug -c -n dup_viewmode_modal -D -o ../public/jsviews
function dup_viewmode(data) {

	let dom = null,

		buildUI = function () {
			if (!dom) {
				dom = $(dup_viewmode_ui(data));
				dom.id = 'viewmode';
			}
			return dom;
		},


		init = () => {
			$('table').hover(function () {
				$('#controls_for_' + $(this).prop('id')).removeClass('d-none').addClass('d-inline-block');
			}, function () {
				$('#controls_for_' + $(this).prop('id')).removeClass('d-inline-block').addClass('d-none');
			});
		};

	this.refresh = () => {
		$.ajax('/getAppContent', {
			type: 'get',
			success: function (res) {
				dom.replaceWith($(dup_viewmode_ui(res)));
				init();
			}
		});
	};

	this.putInto = (target) => {
		if (!dom) buildUI();
		$.when(target.children(':first').replaceWith(dom)).then(init);
	};
}