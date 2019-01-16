let u = new datauploadpage();
let udom = u.UI();
let d = new datalinkpage();
let ddom = d.UI();
let s = new statuspage();
let sdom = s.UI();
let l = new launchpage();
let ldom = l.UI();
showPage('initial');

function showPage(name) {
	let contendDOM = $('#content')[0];
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
	$('#pagetoggles input[type="radio"]').change(function () {
		if ($(this).is(':checked'))
			showPage($(this).prop('name'));
	});
});