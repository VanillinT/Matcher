function isNullOrWhitespace(input) {
	if (typeof input === 'undefined' || input == null) return true;
	return input.replace(/\s/g, '').length < 1;
}
function uploadFD(formDataArray, resolved, rejected) {
	if(!formDataArray[0])
		return;
	let formData=formDataArray.pop();
	$.when($.ajax({
		url: '/upload',
		enctype: 'multipart/form-data',
		processData: false,
		cache: false,
		contentType: false,
		type: 'post',
		data: formData
	})).then(()=>resolved(),(err)=>rejected(err))
		.then(()=>{
		uploadFD(formDataArray, resolved, rejected)});
}