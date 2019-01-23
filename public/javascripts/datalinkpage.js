//pug ./dlp_ui.pug -c -n dlp_ui -D -o ../public/jsviews
function datalinkpage(params) {

	let dom = null;

	let initialized = false;

	let rows = [];

	let sp = () => $('#selected_path');

	this.UI = function () {
		if(!dom) {
			dom = document.createElement('div')
			dom.innerHTML = dlp_ui(params);
			dom.id = 'datalinkpage';
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
		let newrow = new dl_tablerow(row);
		newrow.UI();
		newrow.putInto($('#tbody')[0]);
		rows.push(newrow);
	};

	let init = () => {
		if(initialized) return;

		$('#add_dtr').click(() => {
			newRow();
		});


		$('#btn_start').click(async function () {

		});

		$('#btn_start').popover({
			placement: 'top',
			content: 'Проверьте данные',
			trigger: 'manual'
		});

		$('#btn_start').focusout(function () {
			$(this).popover('hide');
			$('input').removeClass('is-invalid');
		});

		initialized = true;
	}
}