//pug ./ltr_ui.pug -c -n ltr_ui -D -o ../public/jsviews
//pug ./file_list_modal.pug -c -n file_list_modal -D -o ../public/jsviews
function ltr(params) {

	let This = this,
		id = params.id,

		dom = null,

		data = null,

		st = () => $('#template_file_' + id),
		sd = () => $('#data_file_' + id),
		ss = () => $('#row_splitter_' + id),
		sr = () => $('#new_row_splitter_' + id),

		isActive = () => $('#selected_state_' + id).prop('checked'),

		init = () => {
			$('#browse_temp_' + id).on('click', async function (e) {
				e.preventDefault();
				await showModal(st(), 'Templates');
			});

			$('#browse_data_' + id).on('click', async function (e) {
				e.preventDefault();
				await showModal(sd(), 'Data');
			});

			$('#state_outline_' + id).click(function (e) {
				if(!$(e.target).is('input'))
					$('#selected_state_' + id).click();
			});

			[ss(), sr()].forEach((el) => {
				el.on('change', function () {
					$(this).val($(this).val().trim());
					$(this).removeClass('is-invalid');
				});
			});
			save_state();
		},

		buildUI = () => {
			dom = $(ltr_ui(params));
		};

 /* data = { template_file, data_file, row_splitter, new_row_splitter } */
	this.data = () => {
		data = {
			template_file: st().val(),
			data_file: sd().val(),
			row_splitter: ss().val(),
			new_row_splitter: sr().val(),
			id: id
		};
		return data;
	};

	this.validate = function (error) {
		let valid = isActive();

		if (valid) {
			[st(), sd(), ss(), sr()].forEach(function (el) {
				if (isNullOrWhitespace(el.val())) {
					el.addClass('is-invalid');
					valid = false;
				}
			});

			if (!valid) error();
			else {
				This.data();
			}
		}
		return valid;
	};


	this.putInto = function (parent) {
		if (!dom) buildUI();
		$.when(parent.append(dom)).then(init);
	};

	this.delete = () => {
		dom.remove();
		delete This;
	};

	async function showModal(el, folder) {
		await $.ajax({
			url: '/get_file_list_modal',
			type: 'post',
			data: {folder},
			success: function (modal) {
				$(modal)
					.on('hidden.bs.modal', function () {
						$(this).remove();
					})
					.on('shown.bs.modal', function () {
						let mod = $(this);
						$('#file_list').hover(function () {
							$(this).css('cursor', 'pointer')
						}, function () {
							$(this).css('cursor', 'default')
						});
						$('#file_list tr td').click(function () {
							el.val('App/' + type + '/' + $(this).text());
							el.removeClass('is-invalid');
							save_state();
							mod.modal('hide');
						});
					})
					.modal();
			},
			error: function (err) {
				console.log(err)
			}
		});
	}
}