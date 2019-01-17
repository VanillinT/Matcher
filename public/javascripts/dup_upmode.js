//pug ./dup_upmode_ui.pug -c -n dup_upmode_ui -D -o ../public/jsviews

function dup_upmode() {
	let This = this;

	let dom = null;

	let initialized = false;

	let rows = [];

	this.UI = function () {
		if(!dom) {
			dom = document.createElement('div');
			dom.innerHTML = dup_upmode_ui();
			dom.id = 'upmode';
		}
		return dom;
	};

	this.putInto = (parent) => {
		parent.replaceChild(dom, parent.firstChild);
		init();
	};

	this.onupload = null;

	let newRow = (row) => {
		if(!row)
			row = {spl:';', nrow:'/t', id: rows.length};
		let newrow = new uploadtablerow(row);
		newrow.UI();
		newrow.putInto($('#tbody')[0]);
		rows.push(newrow);
	};

	let getFormedData = () => {
		let formedData = [];
		rows.forEach(function (row) {
			let fd = row.formData();
			if(!fd){
				$('#btn_upload').popover('show');
				return;
			}
			formedData.push(fd);
		});
		return formedData[0] ? formedData : false;
	};

	let init = () => {
		if(initialized) return;

		$('#add_utr').click(() => {
			newRow();
		});

		$('#btn_upload').click(async function () {
			let validRows = rows.filter(row=>row.validate());
			validRows.forEach(async (row)=>{
				let container = $('#tbody')[0];
				let formData = row.formData();
				if(formData) {
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
							row.UI().innerHTML = res;
							if (This.onupload) {
								This.onupload();
							}
							setTimeout(function () {
								row.delete(container);
							}, 5000);
						}, (err) => {
							row.UI().innerHTML = 'Файл не смог быть загружен. Ошибка: ' + err;
							setTimeout(function () {
								row.delete(container);
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
		initialized = true;
	}
}