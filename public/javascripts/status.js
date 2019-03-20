function deleteStatus(id) {
	$.post({
		url: '/deletestatus',
		data: {id},
		success: function (res) {
			notify(res);
			if(id >= 0 )
				$(`#status_${id}`).remove();
			else{
				$('tbody tr').remove();
			}
		}
	})
}