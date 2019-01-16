//pug ./dtr_ui.pug -c -n dtr_ui -D -o ../public/jsviews
function datatablerow(params) {

	let id = params.id;

	let dom = null;

	let selected_template = null;
	let selected_data = null;
	let selected_splitter = null;
	let selected_rowsym = null;
	let selected_state = false;

	let linked_temp = params.template ? params.template : null;
	let linked_data = params.data ? params.data : null;

	let st = () =>  $('#selected_template_' + id);
	let sd = () => $('#selected_data_' + id);
	let ss = () => $('#selected_splitter_'+id);
	let sr = () => $('#selected_rowsym_'+id);

	let fd;

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
	};

	let init = () => {
		[st(),sd()].forEach((el)=>{
			el.on('change',function(){
				let fileName = $(this).prop('files')[0].name;
				if(fileName) {
					$(this).removeClass('is-invalid');
					$(this).next('.custom-file-label').html(fileName);
				} else $(this).preventDefault();
			});
		});
		[ss(), sr()].forEach((el)=>{
			el.on('change', function () {
				$(this).val($(this).val().trim());
				$(this).removeClass('is-invalid');
			});
		});
	};

	this.data= () => { return fd };

	this.validate= function() {
		let valid = selected_state = $('#selected_state_'+id)[0].checked;
		[st(), sd(), ss(), sr()].forEach((el)=> {
			if ((el.type === 'file' && !el[0].files[0]) || isNullOrWhitespace(el.val())) {
				el.addClass('is-invalid');
				valid = false;
			}
		});
		if(valid) {
			if(!linked_data) selected_data = sd().prop('files')[0];
			if(!linked_temp) selected_template = st().prop('files')[0];
			selected_splitter = ss().val();
			selected_rowsym = sr().val();

			fd = new FormData();
			fd.append(linked_temp ? 'templink' : 'files', linked_temp ? linked_temp : selected_template);
			fd.append(linked_data ? 'datalink' : 'files', linked_data ? linked_data : selected_data);
			fd.append('splitrow',selected_splitter);
			fd.append('newrow', selected_rowsym);
		}
		return valid;
	}
}