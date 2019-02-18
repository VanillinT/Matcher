//pug ./uploadpage.pug -c -n dup_upmode_ui -D -o ../public/jsviews
page = '/upload_and_view/upload';
window.history.pushState('upload', 'upload', page);

up_rows.forEach(row=>{
	processRow(row);
});

$('#add_utr').click(() => {
	new_up_Row();
});

$('#btn_upload').click(async function () {
	let validRows = up_rows.filter(row => row.validate());
	validRows.forEach((row) => {
		let formData = row.formData();
		if (!formData) return;

		$.when($.ajax({
			url: '/upload',
			enctype: 'multipart/form-data',
			processData: false,
			cache: false,
			contentType: false,
			type: 'post',
			data: formData
		}))
			.then((res) => {
				notify(res);
				up_rows = up_rows.filter(r => r != row);
				row.delete();
			}, (err) => {
				alert(err);
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
