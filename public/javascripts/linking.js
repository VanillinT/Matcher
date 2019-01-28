//pug ./dlp_ui.pug -c -n dlp_ui -D -o ../public/jsviews

let rows = [],

sel_path = () => $('#selected_path').val(),

newRow = (row) => {
	if (!row)
		row = {spl: ';', nrow: '/t', id: rows.length};
	let newrow = new ltr(row);
	newrow.putInto($('#tbody'));
	rows.push(newrow);
};

$('#add_dtr').click(() => {
	newRow();
});


$('#btn_start')
	.click(async function () {
		let btn = $(this),
			valid_rows = rows.filter(row => row.validate(function () {
				btn.popover('show');
			})),
			data = [];
		if (!valid_rows[0]) return;

		//row_data = { template_file, data_file, row_splitter, new_row_splitter }
		for (let row of valid_rows) {
			let rd = row.data();
			rd.out_dir = sel_path();
			data.push(rd);
		}
		data = JSON.stringify(data);
		console.log(data);
		$.post({
			url: '/process_files',
			data: {data},
			success: function (res) {
				valid_rows.forEach(row=>{
					row.notify('Успех');
					setTimeout(row.delete, 2000);
				})
			}
		});
	})
	.popover({
		placement: 'top',
		content: 'Проверьте данные',
		trigger: 'manual'
	})
	.focusout(function () {
		$(this).popover('hide');
		$('input').removeClass('is-invalid');
	});