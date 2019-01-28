//pug ./uploadpage.pug -c -n dup_upmode_ui -D -o ../public/jsviews

$('#add_utr').click(() => {
	newRow();
});

$('#btn_upload').click(async function () {
	let validRows = rows.filter(row => row.validate());
	validRows.forEach(async (row) => {
		let formData = row.formData();
		if (formData) {
			await $.when($.ajax({
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
					setTimeout(function () {
						row.delete();
					}, 5000);
				}, (err) => {
					row.notify(err);
					setTimeout(function () {
						row.delete();
					}, 5000);
				});
		} else rows.push(row);
	});
	validRows.forEach((el) => {
		rows = rows.filter(row => row != el);
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

