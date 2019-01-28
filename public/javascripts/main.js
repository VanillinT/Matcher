$(document).ready(()=> {
	$('#main').height($(document).height());

	$('#pagetoggles input[type="radio"]').change(function () {
		if ($(this).is(':checked'))
				window.location.href=$(this).prop('name');
	});
});