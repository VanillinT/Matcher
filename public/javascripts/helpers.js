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
			var a = document.createElement('a');
			var url = window.URL.createObjectURL(data);
			a.href = url;
			a.download = filename;
			a.click();
			window.URL.revokeObjectURL(url);
		}
	});
}

async function viewFile(filename, path) {
	let data = {path};
	await $.ajax({
		url: '/getContent',
		type: 'post',
		data: data,
		success: function (res) {
			let modaldom = dup_viewmode_modal({filename, text: res});
			$('#main').append(modaldom);
			$(modaldom).modal('show');
			$('#btn_edit').click(function () {
				console.log('meme');
				$('#text_box').prop('contenteditable', true);
			});
		}
	});
}