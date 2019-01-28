//pug ./view.pug -c -n dup_viewmode_ui -D -o ../public/jsviews
//pug ./dup_viewmode_modal.pug -c -n dup_viewmode_modal -D -o ../public/jsviews

$('table').hover(function () {
	$('#controls_for_' + $(this).prop('id')).removeClass('d-none').addClass('d-inline-block');
}, function () {
	$('#controls_for_' + $(this).prop('id')).removeClass('d-inline-block').addClass('d-none');
});