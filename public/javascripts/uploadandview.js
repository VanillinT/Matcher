//pug ./uploadandview.pug -c -n dup_ui -D -o ../public/jsviews

$('#uv_content').height($(document).outerHeight() - $('#footer').outerHeight() - $('#pagetoggles').outerHeight());

window.location.hash = '#mode=view';

$('#modetoggles :radio').change(function () {
	if ($(this).is(':checked')) {
		let mode = $(this).prop('name'),
			container = $('#uv_content');
		$.post({
			url: '/upload_and_view/' + mode,
			success: function (res) {
				window.location.hash = '#mode=' + mode;
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

let rows = [],
	newRow = (row) => {
		if (!row)
			row = {spl: ';', nrow: '/t', id: rows.length};
		let new_row = new utr(row);
		new_row.putInto($('#tbody'));
		rows.push(new_row);
	};
