//pug ./dlp_ui.pug -c -n dlp_ui -D -o ../public/jsviews


$('#selected_path').val(sel_path);

li_rows.forEach(row=>{
	row.putInto($('#li_tbody'))
});

$('#add_dtr').click(() => {
	new_li_row();
});


$('#btn_start')
	.click(async function () {
		let btn = $(this),
			valid_rows = li_rows.filter(row => row.validate(function () {
				btn.popover('show');
			})),
			data = [];
		if (!valid_rows[0]) return;

		//row_data = { template_file, data_file, row_splitter, new_row_splitter }
		for (let row of valid_rows) {
			let rd = row.data();
			sel_path = path_box();
			rd.out_dir = sel_path;
			data.push(rd);
		}
		data = JSON.stringify(data);
		$.post({
			url: '/process_files',
			data: {data},
			success: function (res) {
				notify(res);
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


function delete_ltr(id) {
	if(id>0) {
		let row_i = li_rows.indexOf(li_rows.find(row=> row.id === id));
		li_rows = li_rows.splice(row_i, 1);
	} else {
		li_rows.forEach(row=> row.delete());
		li_rows = [];
	}
	save_state();
}