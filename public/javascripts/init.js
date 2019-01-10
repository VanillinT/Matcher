let rowcount = 0;
let rows = [];
function addRow() {
	let newrow = new tr({spl:';', nrow:'/t', id: rowcount});
	let trdom = newrow.UI();
	$('#tbody')[0].appendChild(trdom);
	rows.push(newrow);
	rowcount++;
	$('input[type="file"]').on('change',function(){
		let fileName = $(this).val();
		if(fileName){
			$(this).removeClass('is-invalid');
			$(this).next('.custom-file-label').html(fileName);
		}
	});
	$('input[type="text"]').on('change', function () {
		$(this)[0].value = $(this)[0].val().trim();
		$(this).removeClass('is-invalid');
	});
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

function validate() {

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
		let path = $('#selected_path')[0].val();
		if(isNullOrWhitespace(path))
			$('#selected_path').addClass('is-invalid');
		let rows_data = [];
		let rows_valid = true;
		rows.forEach((el) => {
			if(el.validate()) {
				let data = el.data();
				rows_data.push(data);
			}
			else rows_valid = false;
		});
		if(!rows_valid || !path){
			$(this).popover('show');
			return;
		}
		let result = {rows_data, path};
		console.log(result);
		$.ajax({
			url: '/process_files',
			type: 'post',
			data: result,
			success: function (res) {
				alert('Данные успешно обработаны');
				console.log(res);
			},
			error: function (err) {
				console.log(err);
				alert('Произошла ошибка: ' + err.message);
			}
		});
	});
	$('#btn_start').popover({
		placement: 'top',
		content: 'Проверьте данные',
		trigger: 'manual'
	});
	$('#btn_start').focusout(function () {
		$(this).popover('hide');
	});
});