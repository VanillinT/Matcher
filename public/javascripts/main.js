$(document).ready(()=> {
	$('#main').height($(document).height());
	document.title = 'SNO';
	$('#pagetoggles input[type="radio"]').change(function () {
		let section = $(this).prop('name');
		if ($(this).is(':checked'))
				window.history.pushState(section, section, section);
		$.post({
			url: section,
			success: function (html) {
				$('#sections').html(html);
			}
		})
	});
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
	sel_path = 'App/Models';

	new_li_Row = (row) => {
		if (!row)
			row = {spl: ';', nrow: '/t', id: li_rows.length};
		let newrow = new ltr(row);
		newrow.putInto($('#tbody'));
		li_rows.push(newrow);
	};