//pug ./utr_ui.pug -c -n utr_ui -D -o ../public/jsviews
function utr(params) {
	let This = this,
		id = params.id,

		dom = $(params.dom),

		selected_file = params.selected_file,
		selected_type = params.selected_type,

		sfile = () => $('#selected_file_' + id),
		sfol = () => $('#selected_folder_' + id),
		st = () => $('#selected_type_' + id),

		buildUI = () => {
			dom = $(utr_ui({id}));
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
					sfol().val('App/' + selected_type);
				else
					sfol().val('');
			});

			$('#browse_folder_' + id).click(function () {
				sfol().val();
			});
		};

	this.info = () => {
		console.log(selected_file);
		return {id, dom: '<tr class="d-flex">' + $(dom).html() + '</tr>', selected_type, selected_file};
	};

	this.putInto = function (parent) {
		if(!dom.html()) buildUI();
		$.when(parent.append(dom)).then(init);
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
		console.log(selected_file);
		let fd = new FormData();
		fd.append('type', selected_type);
		fd.append('file', selected_file);
		return fd;
	};

	this.notify = (message) => {
		let info = $();
		$.when(dom.replaceWith(info = $('<tr class="container"><td colspan="3"><p>' + message + '</p></td></tr>'))).then(
		setTimeout(function () {
			info.remove();
		}, 2000));
	};

	this.delete = () => {
		dom.remove();
		delete This;
	};

	this.id = () => id;
}
