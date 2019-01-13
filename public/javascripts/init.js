let rowcount = 0;
let rows = [];
function addRow(data) {
	if(!data)
		data = {spl:';', nrow:'/t', id: rowcount}
	let newrow = new tr(data);
	let trdom = newrow.UI();
	$('#tbody')[0].appendChild(trdom);
	newrow.init();
	rows.push(newrow);
	rowcount++;
}

let d = new dlp();
let ddom = d.UI();
let s = new sp();
let sdom = s.UI();
let l = new lp();
let ldom = l.UI();
showPage('initial');
addRow();

function showPage(name) {
	let contendDOM = $('#content')[0];
	switch(name) {
		case 'statuspage':
			contendDOM.replaceChild(sdom, contendDOM.firstChild);
			break;
		case 'launchpage':
			contendDOM.replaceChild(ldom, contendDOM.firstChild);
			break;
		default:
			contendDOM.replaceChild(ddom, contendDOM.firstChild);
			break;
	}
}

$(document).ready(()=> {
	$('input[type="radio"]').change(function () {
		if ($(this).is(':checked'))
			showPage($(this).prop('name'));
	});

	$('#addrowbtn').click(() => {
		addRow();
	});

	$('#btn_start').click(async function () {
		let successful_uploads = 0;
		let errors = 0;
		let path = $('#selected_path').val();
		if (isNullOrWhitespace(path))
			$('#selected_path').addClass('is-invalid');
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
		let prevResp = null;
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
});