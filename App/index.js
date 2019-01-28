fs = require('fs');

exports.getAppContent = () => {
	let root = 'App/',
		folders = this.getFoldersList(),
		content = [];
	for(let type of folders) {
		let folder = {name: type, files: []},
			files = this.getFilesList(type);
		for(let fil of files){
			let file = {name: fil, root:root + type, fullpath: root + type + '/' + fil};
			folder.files.push(file);
		}
		content.push(folder);
	}
	return content;
};
exports.countChildren = (path) => {
	return getFoldersList(path).length;
};

exports.getFoldersList = (path='App/') => {
	return fs.readdirSync(path).filter(function (file) {
		return fs.statSync(path+'/'+file).isDirectory();
	});
};

exports.getFilesList = (type) => {
	return fs.readdirSync('App/' + type);
};

exports.getLoggedModels = () => {
	try {
		let obj  = fs.readFileSync('App/log.json');
		return JSON.parse(obj.toString());
	} catch (e) { return [] }
};
function saveLog(new_state) {
	fs.writeFileSync('App/log.json', JSON.stringify(new_state));
}
function countLaunches() {
	let models = exports.getLoggedModels();
	if(models[0])
		return models.pop().launch_id;
	return 0;
}
exports.appendLog = (models) => {
	let logged_models = exports.getLoggedModels(),
		cnt = countLaunches();
	models.forEach((model) => {
		model.id = logged_models.length;
		model.status = 'В ожидании';
		model.launch_id = cnt+1;
		logged_models.push(model);
	});
	saveLog(logged_models);
};
exports.changeLog = async (model) => {
	let models = await exports.getLoggedModels();
	models[model.id] = model;
	saveLog(models);
};

exports.process = async (model) => {

	let {template_file, data_file, row_splitter, new_row_splitter, out_dir} = model;

	let es = require('event-stream'),
		lineNr = 0,

		array_header = [],
		dict_header = {},

		template_b = fs.readFileSync(template_file),
		template_string = template_b.toString("UTF-8"),

		out_file = model.out_dir + '/' + model.template_file.split('/')[2].slice(0, -4) + '_IMP.imp';
	model.status = 'В процессе';
	await this.changeLog(model);

	let logger = fs.createWriteStream(out_file, {
			flags: 'a' // 'a' means appending (old data will be preserved)
		}),

		s =
			fs.createReadStream(data_file)
				.pipe(es.split())
				.pipe(es.mapSync(function (line) {

						// pause the read stream
						s.pause();

						if (lineNr === 0) {
							array_header = line.split(row_splitter);
							dict_header = array_header.reduce((p, x, i) => {
								p[i] = x;
								return p;
							}, {});
						}
						else {
							var array_values = line.split(row_splitter);
							array_values = array_values.map((x, i) => {
								return {v: x, h: dict_header[i]}
							});

							// делаем замену и дописываем выход
							var replaced_line = template_string;
							array_values.forEach((x, i) => {
								//h-исходное слово
								//v-новое значение
								if (x.h.length > 0) {
									replaced_line = replaced_line.replace('/' + x.h + '/g', x.v);
								}
							});
							// тепреь все готово. записываем в выходной файл
							logger.write(replaced_line);
						}

						lineNr += 1;

						// process line here and call s.resume() when rdy
						// function below was for logging memory usage
						//logMemoryUsage(lineNr);

						// resume the read stream, possibly from a callback
						s.resume();
					})
						.on('error', async function (err) {
							console.log('Error while reading file.', err);
							model.out_file = out_file;
							model.status = 'Ошибка';
							await exports.changeLog(model);
						})
						.on('end', async function () {
							console.log('Read entire file.');
							logger.end();
							model.out_file = out_file;
							model.status = 'Завершено';
							await exports.changeLog(model);
						})
				);
};
