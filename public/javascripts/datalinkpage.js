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
		let newrow = new datatablerow(row);
		newrow.UI();
		newrow.putInto($('#tbody')[0]);
		rows.push(newrow);
	};

	let init = () => {
		if(initialized) return;

		/*$.ajax('/getInit', {
			success: function (res) {
				let rowsdata = res;
				rowcount = rowsdata.length;
				rowsdata.forEach((row) => {
					newRow(row);
				});
			}
		});*/

		$('#add_dtr').click(() => {
			newRow();
		});


		$('#btn_start').click(async function () {
			let successful_uploads = 0;
			let errors = 0;
			let path = sp().val();
			if (isNullOrWhitespace(path))
				sp().addClass('is-invalid');
			let formDataArr = [];
			let rows_valid = true;
			rows.forEach((el) => {
				if (el.isActive()) {
					if (el.validate()) {
						let data = el.data();
						formDataArr.push(data);
					}
					else rows_valid = false;
				}
			});
			if (!rows_valid || !path) {
				$(this).popover('show');
				return;
			}
			formDataArr.forEach(function (fd) {
				fd.append('path', path);
			});
			uploadFD(formDataArr,
				(success) => {
					successful_uploads++;
					$('#suc')[0].textContent = 'Составлено моделей: ' + successful_uploads
				},
				(error) => {
					console.log(error);
					errors++;
					$('#err')[0].textContent = 'Ошибок: ' + errors;
				});
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