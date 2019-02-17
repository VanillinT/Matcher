function deleteStatus(id) {
	$.post({
		url: '/deletestatus',
		data: {id},
		success: function (res) {
			console.log(res);
			$(`#status_${id}`).remove();
		}
	})
}