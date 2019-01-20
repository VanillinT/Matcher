function isNullOrWhitespace(input) {
	if (typeof input === 'undefined' || input == null) return true;
	return input.replace(/\s/g, '').length < 1;
}
async function uploadFD(formDataArray, resolved, rejected) {
	if(!formDataArray[0])
		return;
	let formData = formDataArray.pop();
	await $.when($.ajax({
		url: '/upload',
		enctype: 'multipart/form-data',
		processData: false,
		cache: false,
		contentType: false,
		type: 'post',
		data: formData
	}))
		.then((res)=>resolved(res), (err)=>rejected(err))
			.then(async ()=> {
				await uploadFD(formDataArray, resolved, rejected);
			});
}

function deleteFile(path, elementid) {
	let data = {path};
	$.ajax({
		url:'/delete',
		type: 'post',
		data: data,
		success: function (res) {
			console.log(res);
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

async function viewFile(filename, path, type) {
	let data = {path};
	await $.ajax({
		url: '/getContent',
		type: 'post',
		data: data,
		success: function (res) {
			let modal = dup_viewmode_modal({filename, text: res});
			$(modal)
				.on('hidden.bs.modal', function (e) {
					$(this).remove();
				})
				.on('shown.bs.modal', function (e) {
					$('#btn_edit').click(function () {
						$('#text_box').attr('contenteditable', true).focus();
					});
					$('#btn_save').click(function () {
						$('#text_box').attr('contenteditable', false);
						let text = $('#text_box').text();
						var fd = new FormData();
						var blob = new Blob([text], { type: 'plain/text' });
						fd.append('type', type);
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
								alert(res);
							},
							error: function (err) {
								console.log(err);
							}
						})
					});
				})
				.modal();
		}
	});
}