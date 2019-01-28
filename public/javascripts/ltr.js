//pug ./ltr_ui.pug -c -n ltr_ui -D -o ../public/jsviews
//pug ./file_list_modal.pug -c -n file_list_modal -D -o ../public/jsviews
function ltr(params) {

	let id = params.id,

		dom = null,

		data = null,

		st = () => $('#selected_template_' + id),
		sd = () => $('#selected_data_' + id),
		ss = () => $('#selected_splitter_' + id),
		sr = () => $('#selected_rowsym_' + id),

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
			[ss(), sr()].forEach((el) => {
				el.on('change', function () {
					$(this).val($(this).val().trim());
					$(this).removeClass('is-invalid');
				});
			});
		},

		buildUI = () => {
			dom = $(ltr_ui(params));
		};

	this.data = () => {
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
				data = {
					template_file: st().val(),
					data_file: sd().val(),
					row_splitter: ss().val(),
					new_row_splitter: sr().val()
				}
			}
		}
		return valid;
	};


	this.putInto = function (parent) {
		if (!dom) buildUI();
		$.when(parent.append(dom)).then(init);
	};

	this.notify = (message) => {
		let info = $();
		$.when(dom.replaceWith(info = $('<tr class="container"><td colspan="3"><p>' + message + '</p></td></tr>>'))).then(
			setTimeout(function () {
				info.remove();
			}, 2000));
	};

	this.delete = () => {
		dom.remove();
		delete this;
	};

	async function showModal(el, type) {
		await $.ajax({
			url: '/getFolder',
			type: 'post',
			data: {type},
			success: function ({type, files}) {
				let modal = file_list_modal({type, files});
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