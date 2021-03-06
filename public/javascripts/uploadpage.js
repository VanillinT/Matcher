//pug ./uploadpage.pug -c -n dup_upmode_ui -D -o ../public/jsviews
page = '/upload_and_view/upload';
window.history.pushState('upload', 'upload', page);

up_rows.forEach(row=>{
	process_up_row(row);
});

$('#add_utr').click(() => {
	new_up_row();
});

$('#btn_upload').click(async function () {
	let validRows = up_rows.filter(row => row.validate());
	validRows.forEach((row) => {
		let formData = row.formData();
		if (!formData) return;

		$.ajax({
			url: '/upload',
			enctype: 'multipart/form-data',
			processData: false,
			cache: false,
			contentType: false,
			type: 'post',
			data: formData,

			success: function(res) {
				notify(res);
				up_rows = up_rows.filter(r => r != row);
				row.delete();
			},
			error: function(err) {
				console.log(err);
				notify(err.responseText);
			}
		});
	});
})
	.popover({
		placement: 'top',
		content: 'Проверьте данные',
		trigger: 'manual'
	})
	.focusout(function () {
		$(this).popover('hide');
		$('input, select').removeClass('is-invalid');
	});
