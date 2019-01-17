//pug ./utr_ui.pug -c -n utr_ui -D -o ../public/jsviews
function uploadtablerow(params) {

	let id = params.id;

	let dom = null;

	let initialized = false;

	let selected_file = null;
	let selected_type = null;

	let sfile = () => $('#selected_file_' + id);
	let sfol = () => $('#selected_folder_' + id);
	let st = () => $('#selected_type_' + id);

	this.UI = () => {
		if (!dom) {
			dom = document.createElement('tr');
			dom.innerHTML = utr_ui(params);
		}
		return dom;
	};

	this.putInto = function(parent) {
		parent.append(dom);
		init();
	};

	this.getFormData = () => {
		let fd = new FormData();
	};

	this.validate = () => {
		let valid = true;
		[sfile(), st()].forEach(function (el) {
				if ((el.type === 'file' && !el[0].files[0]) || isNullOrWhitespace(el.val())) {
					el.addClass('is-invalid');
					valid = false;
				}
		});
		return valid;
	};

	this.formData = () => {
		let fd = new FormData();
		fd.append('type', selected_type);
		fd.append('file', selected_file);
		return fd;
	};

	this.delete = (parent) => {
		parent.removeChild(dom);
		delete this;
	};

	let init = () => {
		if(initialized) return;

		sfile().change(function(evt){
			let fileName = $(this).prop('files')[0].name;
			if(fileName) {
				$(this).removeClass('is-invalid');
				$(this).next('.custom-file-label').html(fileName);
				selected_file = $(this).prop('files')[0]
			} else evt.preventDefault();
		});

		st().change(function () {
			selected_type = $(this).val();
			if(!isNullOrWhitespace(selected_type))
				sfol().val('App/' + selected_type);
			else
				sfol().val('');
		});

		$('#browse_folder_' + id).click(function () {
			sfol().val();
		});

		initialized=true;

	}

}
