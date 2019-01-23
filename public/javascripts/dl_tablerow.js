//pug ./dtr_ui.pug -c -n dtr_ui -D -o ../public/jsviews
//pug ./file_list_modal.pug -c -n file_list_modal -D -o ../public/jsviews
function dl_tablerow(params) {

	let id = params.id;

	let dom = null;

	let selected_template = null;
	let selected_data = null;
	let selected_splitter = null;
	let selected_rowsym = null;
	let selected_state = false;

	let st = () =>  $('#browse_temp_' + id);
	let sd = () => $('#browse_data_' + id);
	let ss = () => $('#selected_splitter_'+id);
	let sr = () => $('#selected_rowsym_'+id);

	this.isActive = () => $('#selected_state_' + id).prop('checked');

	this.UI = () => {
		if(!dom) {
			dom = document.createElement('tr');
			dom.innerHTML = dtr_ui(params);
		}
		return dom;
	};

	this.putInto = function(parent) {
		parent.append(dom);
		init();
	};

	let init = () => {
		st().on('click', async function (e) {
			e.preventDefault();
			await showModal($('#selected_template_' + id), 'Templates');
		});
		sd().on('click', async function (e) {
			e.preventDefault();
			await showModal($('#selected_data_' + id), 'Data');
		});
		[ss(), sr()].forEach((el)=>{
			el.on('change', function () {
				$(this).val($(this).val().trim());
				$(this).removeClass('is-invalid');
			});
		});
	};

	this.data= () => null;

	this.validate = function() {
		let valid = selected_state = $('#selected_state_'+id)[0].checked;

		return valid;
	};

	async function showModal(el, type) {
		await $.ajax({
			url: '/getFolder',
			type: 'post',
			data: {type},
			success: function ({type, files}) {
				let modal = file_list_modal({type, files});
				$(modal)
					.on('hidden.bs.modal', function (e) {
						$(this).remove();
					})
					.on('shown.bs.modal', function (e) {
						let mod = $(this);
						$('#file_list').hover(function () {
							$(this).css('cursor', 'pointer')
						}, function () {
							$(this).css('cursor', 'default')
						});
						$('#file_list tr td').click(function () {
							el.text($(this).text());
							mod.modal('hide');
						});
					})
					.modal();
			}
		});
	}
}