//pug ./uploadpage.pug -c -n dup_upmode_ui -D -o ../public/jsviews
window.history.pushState('upload', 'upload', '/upload_and_view/upload');

up_rows.forEach(row=>{
	processRow(row);
});

$('#add_utr').click(() => {
	new_up_Row();
});

$('#btn_upload').click(async function () {
	let validRows = up_rows.filter(row => row.validate());
	console.log(validRows);
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
				row.notify(res);
				up_rows = up_rows.filter(r => r != row);
				setTimeout(function () {
					row.delete();
				}, 5000);
			}, (err) => {
				row.notify(err);
				setTimeout(function () {
					row.delete();
				}, 5000);
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
