//pug ./dup_upmode_ui.pug -c -n dup_upmode_ui -D -o ../public/jsviews

function dup_upmode() {
	let This = this,

		dom = null,

		rows = [],

		buildUI = () => {
			dom = $(dup_upmode_ui());
			dom.id = 'upmode';
		},

		newRow = (row) => {
			if (!row)
				row = {spl: ';', nrow: '/t', id: rows.length};
			let newrow = new dup_tablerow(row);
			newrow.putInto($('#tbody'));
			rows.push(newrow);
		},

		init = () => {

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
								if (This.onupload) {
									This.onupload();
								}
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
			});


			$('#btn_upload').popover({
				placement: 'top',
				content: 'Проверьте данные',
				trigger: 'manual'
			});

			$('#btn_upload').focusout(function () {
				$(this).popover('hide');
				$('input, select').removeClass('is-invalid');
			});
		};

	this.putInto = (target) => {
		if (!dom) buildUI();
		$.when(target.children(':first').replaceWith(dom)).then(init);
	};

	this.onupload = null;
}