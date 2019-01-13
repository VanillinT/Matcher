//pug ./tr_ui.pug -c -n tr_ui -D -o ../public/javascripts
function tr(params) {

	let id = params.id;

	let dom = null;

	let selected_template = null;
	let selected_data = null;
	let selected_splitter = null;
	let selected_rowsym = null;
	let selected_state = false;


	let st = () =>  {return $('#selected_template_' + id)};
	let sd = () => {return $('#selected_data_' + id)};
	let ss = () => {return $('#selected_splitter_'+id)};
	let sr = () => {return $('#selected_rowsym_'+id)};

	let fd;

	this.isActive = ()=> {return $('#selected_state_' + id).prop('checked');};

	this.UI = () => {
		if(!dom) {
			dom = document.createElement('tr');
			dom.innerHTML = tr_ui(params);
		}
		return dom;
	};

	this.init = () =>{
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
				$(this)[0].value = $(this).val().trim();
				$(this).removeClass('is-invalid');
			});
		});
	};

	this.data= () => { return fd };

	this.validate= function() {
		let valid = selected_state = $('#selected_state_'+id)[0].checked;
		[st(), sd(), ss(), sr()].forEach((el)=> {
			if ((el.type === 'file' && !el[0].files[0]) || isNullOrWhitespace(el[0].value)) {
				el.addClass('is-invalid');
				valid = false;
			}
		});
		if(valid) {
			selected_data = sd().prop('files')[0];
			selected_template = st().prop('files')[0];
			selected_splitter = ss().val();
			selected_rowsym = sr().val();

			fd = new FormData();
			fd.append('files', selected_template);
			fd.append('files', selected_data);
			fd.append('splitrow',selected_splitter);
			fd.append('newrow', selected_rowsym);
		}
		return valid;
	}
}