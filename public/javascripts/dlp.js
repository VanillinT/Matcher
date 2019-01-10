//pug ./dlp_ui.pug -c -n dlp_ui -D -o ../public/javascripts
function dlp(params) {

	let dom = null;

	this.UI = function () {
		if(!dom) {
			dom = document.createElement('div')
			dom.innerHTML = dlp_ui(params);
			dom.id = 'dataloadpage';
		}
		return dom;
	}
}