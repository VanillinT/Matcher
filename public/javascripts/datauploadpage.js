//pug ./dup_ui.pug -c -n dup_ui -D -o ../public/jsviews
function datauploadpage(params) {

	let dom = null;
	let container = () => $('#dup_container')[0];

	let dup_up = new dup_upmode();

	let dup_view = null;

	let currentMode = 'up';

	let initialized = false;

	this.UI = function () {
		if(!dom) {
			dom = document.createElement('div');
			dom.innerHTML = dup_ui(params);
			dom.id = 'datauploadpage';
		}
		return dom;
	};

	this.putInto = (parent) => {
		parent.replaceChild(dom, parent.firstChild);
		init();
	};

	let toggleMode = () => {
		switch (currentMode) {
			case 'up':
				dup_view.putInto(container());
				currentMode = 'view';
				$('#btn_upload').hide();
			break;
			case 'view':
				dup_up.putInto(container());
				currentMode = 'up';
				$('#btn_upload').show();
			break;
		}
	};

	let init = () => {
		if(initialized) return;

		dup_up.UI();
		dup_up.putInto(container());

		$.ajax('/getAppContent', {
			type: 'get',
			success: function (res) {
				dup_view = new dup_viewmode();
				dup_view.UI(res);
				dup_up.onupload = dup_view.refresh;
			}
		});

		$('#dup_container').height($(document).outerHeight() - $('#footer').outerHeight() - $('#pagetoggles').outerHeight());

		console.log($('#dup_container').height());

		$('#modetoggles input[type="radio"]').change(function () {
			if ($(this).is(':checked')) {
				toggleMode();
			}
		});

		initialized = true;
	};

	/*$.ajax('/getInit', {
		success: function (res) {
			let rowsdata = res;
			rowcount = rowsdata.length;
			rowsdata.forEach((row)=>{
				newRow(row);
			});
		}});



	$('#btn_upload').click(async function () {
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

	*/
}