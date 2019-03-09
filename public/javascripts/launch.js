$('input[type="checkbox"]').parent().click(function (e) {
	if(!$(e.target).is('input'))
		$(this).children(':first').click();
});

$('#run_btn').click(function () {
	let pairs = [];
	$('tbody tr').each(function (i, r) {
		let row = $(r).find('td'),
			model = $(row[0]).text(),
			report = $(row[1]).find('input'),
			is_active = $(row[2]).find('input').prop('checked');
		if (is_active && is_valid(report))
			pairs.push({model, report: report.val()});
	});
	if (pairs[0]) {
		pairs = JSON.stringify(pairs);
		runModels(pairs);
	}
});

$('tr button').click(async function () {
	let n = this.id.split('_')[2];
	await showModal($('#rep_folder_' + n), 'Reports')
});

function is_valid(report) {
	let valid = false;
	if(isNullOrWhitespace(report.val())) {
		report.addClass('is-invalid')
	} else {
		report.removeClass('is-invalid');
		valid = true
	}
	return valid;
}

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
						el.val($(this).text());
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