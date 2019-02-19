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
	new_up_Row = (row) => {
		row = new utr({spl: ';', nrow: '/t', id: up_rows.length});
		up_rows.push(row);
		row.putInto($('#tbody'));
	},
	processRow = (row) =>{
		row.putInto($('#tbody'));
	},
	path_box = () => $('#selected_path').val(),
	sel_path = 'App/Models',

	new_li_Row = (row) => {
		if (!row)
			row = {spl: ';', nrow: '/t', id: li_rows.length};
		let newrow = new ltr(row);
		newrow.putInto($('#tbody'));
		li_rows.push(newrow);
	},
	notify = (toast)=> {
		$('#notifications').append($(toast));
		$('.toast').on('hidden.bs.toast', function () {
			$(this).remove();
		}).toast('show');
	};