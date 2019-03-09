//pug ./utr_ui.pug -c -n utr_ui -D -o ../public/jsviews
function utr(params) {
	let This = this,
		id = params.id,

		dom = $(params.dom),

		selected_file = params.selected_file,
		selected_type = params.selected_type,
		selected_folder = params.selected_folder,

		sfile = () => $('#selected_file_' + id),
		sfol = () => $('#selected_folder_' + id),
		st = () => $('#selected_type_' + id),

		buildUI = () => {
			dom = $(utr_ui({id, folders: params.folders}));
		},

		init = () => {

			if (selected_file)
				sfile().next('.custom-file-label').html(selected_file.name);
			if(!isNullOrWhitespace(selected_type)) {
				st().val(selected_type);
				sfol().val('App/' + selected_type);
			}

			sfile().change(function (evt) {
				let fileName = $(this).prop('files')[0].name;
				if (fileName) {
					$(this).removeClass('is-invalid');
					$(this).next('.custom-file-label').html(fileName);
					selected_file = $(this).prop('files')[0];
				} else evt.preventDefault();
			});

			st().change(function () {
				selected_type = $(this).val();
				if (!isNullOrWhitespace(selected_type))
					sfol().val('/' + selected_type);
				else
					sfol().val('');
				sfol().trigger('change');
			});

			sfol().change(function () {
				selected_folder = $(this).val();
			});

			$('#browse_folder_' + id).click(function () {
				sfol().val();
			});
		};

	this.info = () => {
		return {id, dom: '<tr class="d-flex">' + $(dom).html() + '</tr>', selected_type, selected_file, selected_folder};
	};

	this.putInto = function (parent) {
		if(!dom.html()) buildUI();
		$.when(parent.append(dom)).then(init);
	};

	this.validate = () => {
		let valid = true;
		[sfile(), sfol()].forEach(function (el) {
			if ((el.type === 'file' && !el[0].files[0]) || isNullOrWhitespace(el.val())) {
				el.addClass('is-invalid');
				valid = false;
			}
		});
		return valid;
	};

	this.formData = () => {
		let fd = new FormData();
		fd.append('folder', selected_folder);
		fd.append('type', selected_type);
		fd.append('file', selected_file);
		return fd;
	};

	this.delete = () => {
		dom.remove();
		delete This;
	};

	this.id = () => id;
}
