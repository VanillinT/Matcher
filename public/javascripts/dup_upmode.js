//pug ./dup_upmode_ui.pug -c -n dup_upmode_ui -D -o ../public/jsviews

function dup_upmode() {

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
			let data = getFormedData();
			if(!data) return;
			await uploadFD(data,
				function (res) {
					console.log(res);
				},
				function (err) {
					console.log(err);
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