//pug ./uploadandview.pug -c -n dup_ui -D -o ../public/jsviews

$('#uv_content').outerHeight($(document).height() - $('#footer').outerHeight() - $('#pagetoggles').outerHeight());

$('#modetoggles :radio').change(function () {
	if ($(this).is(':checked')) {
		let mode = $(this).prop('name'),
			container = $('#uv_content');
		$.post({
			url: '/upload_and_view/' + mode,
			success: function (res) {
				container.html(res);
				if (mode === 'view') {
					$('#btn_upload').hide();
				} else {
					$('#btn_upload').show();
				}
			}
		});
	}
});