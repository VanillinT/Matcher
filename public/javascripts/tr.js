//pug ./tr_ui.pug -c -n tr_ui -D -o ../public/javascripts
function tr(params) {

	let id = params.id;

	let dom = null;

	let selected_template = null;
	let selected_data = null;
	let selected_splitter = null;
	let selected_rowsym = null;
	let selected_state = false;

	let fd;

	this.UI = function () {
		if(!dom) {
			dom = document.createElement('tr');
			dom.innerHTML = tr_ui(params);
		}
		return dom;
	}

	this.data= function () {
		return fd;
	}

	this.validate= function() {
		let st = $('#selected_template_' + id);
		let sd = $('#selected_data_' + id);
		let ss = $('#selected_splitter_'+id);
		let sr = $('#selected_rowsym_'+id);
		let valid = selected_state = $('#selected_state_'+id)[0].checked;
		[st, sd, ss, sr].forEach((el)=> {
			if ((el.type === 'file' && !el[0].files[0]) || isNullOrWhitespace(el[0].value)) {
				el.addClass('is-invalid');
				valid = false;
			}
		});
		if(valid) {
			selected_data = sd[0].files[0];
			selected_template = st[0].files[0];
			selected_splitter = $(ss)[0].value;
			selected_rowsym = $(sr)[0].value;

			fd = new FormData();
			fd.append('files', selected_template);
			fd.append('files', selected_data);
			fd.append('body', selected_splitter);
			fd.append('body', selected_rowsym);
		}
		return valid;
	}
}