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