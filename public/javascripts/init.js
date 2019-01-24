let u = new datauploadpage(),
	d = new datalinkpage(),
	s = new statuspage(),
	l = new launchpage();

showPage('initial');

function showPage(name) {
	let contendDOM = $('#content');
	switch(name) {
		case 'statuspage':
			s.putInto(contendDOM);
			break;
		case 'launchpage':
			l.putInto(contendDOM);
			break;
		case 'datalinkpage':
			d.putInto(contendDOM);
			break;
		default:
			u.putInto(contendDOM);
			break;
	}
}

$(document).ready(()=> {
	$('#main').height($(document).height());

	$('#pagetoggles input[type="radio"]').change(function () {
		if ($(this).is(':checked'))
			showPage($(this).prop('name'));
	});
});