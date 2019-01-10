//pug ./tr_ui.pug -c -n tr_ui -D -o ../public/javascripts
function tr(params) {

	let id = params.id;

	let dom = null;

	let selected_template = null;
	let selected_data = null;
	let selected_splitter = null;
	let selected_rowsym = null;
	let selected_state = false;

	this.UI = function () {
		if(!dom) {
			dom = document.createElement('tr');
			dom.innerHTML = tr_ui(params);
		}
		return dom;
	}

	this.data= function () {
		return {selected_template,selected_data,selected_splitter,selected_rowsym};
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
			selected_data = URL.createObjectURL(sd[0].files[0]);
			selected_template = URL.createObjectURL(st[0].files[0]);
			selected_splitter = $(ss)[0].value;
			selected_rowsym = $(sr)[0].value;
		}
		return valid;
	}
}