$('input[type="checkbox"]').parent().click(function (e) {
	if(!$(e.target).is('input'))
		$(this).children(':first').click();
});

$('#run_btn').click(function () {
	let pairs = [];
	$('tbody tr').each(function (i, r) {
		let row = $(r).find('td'),
			model = $(row[0]).text(),
			target = $(row[1]).find('input').val(),
			is_active = $(row[2]).find('input').prop('checked');
		if (is_active)
			pairs.push({model, target});
	});
	pairs = JSON.stringify(pairs);
	runModels(pairs);
});