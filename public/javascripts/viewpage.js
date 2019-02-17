//pug ./view.pug -c -n dup_viewmode_ui -D -o ../public/jsviews
//pug ./dup_viewmode_modal.pug -c -n dup_viewmode_modal -D -o ../public/jsviews


window.history.pushState('view', 'view', '/upload_and_view/view');

$('table').hover(function () {
	$('#controls_for_' + $(this).prop('id')).removeClass('d-none').addClass('d-inline-block');
}, function () {
	$('#controls_for_' + $(this).prop('id')).removeClass('d-inline-block').addClass('d-none');
});

function showDropdown() {

}

function deleteFile(path, folder, elementid) {
	let data = {path, folder};
	$.ajax({
		url:'/delete',
		type: 'post',
		data: data,
		success: function (res) {
			notify(res);
			$('#' + elementid).remove();
		}
	});
}

function downloadFile(filename, root) {
	let data = {filename, root};
	$.ajax({
		url:'/download',
		type: 'post',
		data: data,
		xhrFields: {
			responseType: 'blob'
		},
		success: function (data) {
			let a = document.createElement('a');
			let url = window.URL.createObjectURL(data);
			a.href = url;
			a.download = filename;
			a.click();
			window.URL.revokeObjectURL(url);
		}
	});
}

function viewFile(filename, path, folder) {
	let data = {filename, path, folder};
	$.post({
		url: '/getViewModal',
		data: data,
		success: function (modal) {
			$(modal)
				.on('hidden.bs.modal', function (e) {
					$(this).remove();
				})
				.on('shown.bs.modal', function (e) {
					$('.modal-body').outerHeight($(document).height() - $('.modal-header').outerHeight() - $('.modal-footer').outerHeight());
					if($('#text_box'))
						$.post({
							url:'/getText',
							data:{path},
							success: function (res) {
								$('#text_box').text(res);
							}
						});
					$('#btn_edit').click(function () {
						let cb = $('#content_box'),
							isEditable = cb.attr('contentEditable');
						if(isEditable)
							cb.removeAttr('contentEditable');
						else cb.attr('contentEditable', !isEditable).focus();
					});
					$('#btn_save').click(function () {
						$('#content_box').attr('contentEditable', false);
						let text = $('#text_box').text();
						if (!text)
							text = table2csv(';');
						var fd = new FormData();
						var blob = new Blob([text], {type: 'plain/text'});
						fd.append('reupload', 'true');
						fd.append('folder', folder);
						fd.append('file', blob, filename);
						$.ajax({
							url: '/upload',
							enctype: 'multipart/form-data',
							processData: false,
							cache: false,
							contentType: false,
							type: 'post',
							data: fd,
							success: function (res) {
								notify(res);
							},
							error: function (err) {
								console.log(err);
							}
						});
					});
				})
				.modal();
		}
	});
}

function table2csv(splitter) {
	let text = '';
	$('#csv_table tr').each(function (i, row) {
		if (i > 0)
			text += '\n';
		let length = $(row).find('td, th').length;
		$(row).find('td, th').each(function (i, cell) {
			text += $(cell).html() + ((i === length - 1) ? '' : splitter);
		});
	});
	return text;
}