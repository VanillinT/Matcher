//pug ./dlp_ui.pug -c -n dlp_ui -D -o ../public/jsviews
function datalinkpage(params) {

	let dom = null,

		rows = [],

		sel_path = () => $('#selected_path').val(),

		newRow = (row) => {
			if (!row)
				row = {spl: ';', nrow: '/t', id: rows.length};
			let newrow = new dl_tablerow(row);
			newrow.putInto($('#tbody'));
			rows.push(newrow);
		},

		init = () => {
			$('#add_dtr').click(() => {
				newRow();
			});


			$('#btn_start')
				.click(async function () {
					let btn = $(this),
						valid_rows = rows.filter(row => row.validate(function () {
							btn.popover('show');
						})),
						fd = new FormData(),
						data = [];
					if (!valid_rows[0]) return;

					for (let row of valid_rows) {
						let rd = row.data();
						rd.out_dir = sel_path();
						data.push(rd);
					}
					data = JSON.stringify(data);
					$.post({
						url: '/process_files',
						data: {data}
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
		},

		buildUI = () => {
			dom = $(dlp_ui(params));
			dom.id = 'datalinkpage';
		};

	this.putInto = (target) => {
		if (!dom) buildUI();
		$.when(target.children(':first').replaceWith(dom)).then(init);
	};
}