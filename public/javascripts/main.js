let current_page = '';

$(document).ready(()=> {
	$('#main').height($(document).height());
	document.title = 'SNO';
	$('#pagetoggles input[type="radio"]').change(function () {
		let section = $(this).prop('name');
		if ($(this).is(':checked'))
			page = section;
			$.post({
				url: section,
				success: function (html) {
					prev_page = html;
					$('#sections').html(html);
					window.history.pushState(section, section, section);
				}
			});
	});
	/*window.onpopstate = function () {
		let showState = function (html) { $('#sections').html(html);};
		if(current_page === '/upload_and_view/view' ? false : (current_page !== '/upload_and_view/upload'))
			showState = null;
		$.post({
			url: current_page,
			success: showState()
		});
	}*/
});

let up_rows = [],
	li_rows = [],
	new_up_row = (row) => {
		row = new utr({id: up_rows.length});
		up_rows.push(row);
		process_up_row(row)
	},
	process_li_row = (row) =>{
		if($('#li_tbody')[0])
			row.putInto($('#li_tbody'));
	},
	process_up_row = (row) =>{
		if($('#up_tbody')[0])
			row.putInto($('#up_tbody'));
	},
	path_box = () => $('#selected_path').val(),
	sel_path = 'App/Models',

	new_li_row = (row) => {
		row = new ltr({
			template_file: row ? row.template_file : '',
			data_file: row ? row.data_file : '',
			row_splitter: row ? row.row_splitter : ';',
			new_row_splitter: row ? row.new_row_splitter : '/t',
			id: row ? row.id : li_rows.length
		});
		li_rows.push(row);
		process_li_row(row);
	},
	notify = (toast)=> {
		$('#notifications').append($(toast));
		$('.toast').on('hidden.bs.toast', function () {
			$(this).remove();
		}).toast('show');
	};

function save_state() {
	let data = [];
	li_rows.forEach(row => {
		let rd = row.data();
		data.push(rd);
	});
	data = JSON.stringify(data);
	$.post({
		url: '/save_li_state',
		data: {data}
	})
}

$.get({
	url:'/get_li_state',
	success: function (res) {
		if(res) {
			let li_saved = JSON.parse(res);
			li_saved.forEach(row => {
				new_li_row(row);
			});
		}
	}
});
