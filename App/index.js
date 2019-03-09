fs = require('fs');

exports.getAppContent = () => {
	let root = __dirname,
		folders = exports.getFoldersList(),
		content = [];
	for(let type of folders) {
		let folder = {name: type, files: []},
			files = this.getFilesList(type);
		for(let fil of files){
			let file = {name: fil, root:root + type, full_path: root + type + '/' + fil};
			folder.files.push(file);
		}
		content.push(folder);
	}
	return content;
};

exports.getModelsList = () => {
	return exports.getFilesList('Models');
};

exports.countChildren = (path) => {
	return exports.getFoldersList(path).length;
};

exports.getFoldersList = (path=__dirname) => {
	return fs.readdirSync(path).filter(function (file) {
		return fs.statSync(path + '/' + file).isDirectory();
	});
};

exports.getFilesList = (type) => {
	return fs.readdirSync(__dirname + '/' + type);
};

exports.getLoggedModels = () => {
	try {
		let obj  = fs.readFileSync(__dirname + '/log.json');
		return JSON.parse(obj.toString());
	} catch (e) { return [] }
};

function saveLog(new_state) {
	fs.writeFileSync(__dirname + '/log.json', JSON.stringify(new_state));
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
		let prev_m = logged_models[logged_models.length-1];
		model.id = prev_m ? prev_m.id+1 : 0;
		model.status = 'В ожидании';
		model.launch_id = cnt+1;
		logged_models.push(model);
	});
	saveLog(logged_models);
};

exports.changeLog = async (model) => {
	let models = await exports.getLoggedModels(),
	 index = models.indexOf(models.find(el => el.id === model.id));
	models[index] = model;
	saveLog(models);
};

exports.deleteLog = async (id) => {
	let logged_models = await exports.getLoggedModels();
	if(id != '-1')
		logged_models = logged_models.filter(el => el.id != id);
	else
		logged_models = [];
	saveLog(logged_models);
};

exports.decode_file = (path) => {
	let detect = require('charset-detector'),
		icv = require('iconv-lite'),
		buffer = fs.readFileSync(path),
		encoding = detect(buffer)[0].charsetName,
		dec_file = icv.decode(buffer, encoding);
	console.log(path);
	fs.writeFileSync(path, dec_file, 'UTF-8');
};

exports.process = async (model) => {

	let {template_file, data_file, row_splitter, new_row_splitter, out_dir} = model;

	let es = require('event-stream'),
		lineNr = 0,

		array_header = [],
		dict_header = {},

		template_b = fs.readFileSync(__dirname + template_file),
		template_string = template_b.toString("UTF-8"),
		out_file = __dirname + out_dir + '/' + model.template_file.split('/')[2].slice(0, -4) + '_IMP.imp';

	if(!fs.existsSync(out_dir))
		fs.mkdirSync(out_dir);
	model.status = 'В процессе';
	await this.changeLog(model);

	let logger = fs.createWriteStream(out_file, {
			flags: 'a' // 'a' means appending (old data will be preserved)
		}),

		s =
			fs.createReadStream('App/' + data_file)
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
									var re = new RegExp(x.h, 'g');
									replaced_line = replaced_line.replace(re, x.v);
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

exports.csv2array = (data, delimeter) => {
	// Retrieve the delimeter
	if (delimeter === undefined)
		delimeter = ',';
	if (delimeter && delimeter.length > 1)
		delimeter = ',';

	// initialize variables
	var newline = '\n';
	var eof = '';
	var i = 0;
	var c = data.charAt(i);
	var row = 0;
	var col = 0;
	var array = [];

	while (c != eof) {
		// skip whitespaces
		while (c === ' ' || c === '\t' || c === '\r') {
			c = data.charAt(++i); // read next char
		}

		// get value
		var value = "";
		if (c === '\"') {
			// value enclosed by double-quotes
			c = data.charAt(++i);

			do {
				if (c != '\"') {
					// read a regular character and go to the next character
					value += c;
					c = data.charAt(++i);
				}

				if (c === '\"') {
					// check for escaped double-quote
					var cnext = data.charAt(i+1);
					if (cnext == '\"') {
						// this is an escaped double-quote.
						// Add a double-quote to the value, and move two characters ahead.
						value += '\"';
						i += 2;
						c = data.charAt(i);
					}
				}
			}
			while (c != eof && c != '\"');

			if (c === eof) {
				throw "Unexpected end of data, double-quote expected";
			}

			c = data.charAt(++i);
		}
		else {
			// value without quotes
			while (c != eof && c != delimeter && c!= newline && c != ' ' && c != '\t' && c != '\r') {
				value += c;
				c = data.charAt(++i);
			}
		}

		// add the value to the array
		if (array.length <= row)
			array.push([]);
		array[row].push(value);

		// skip whitespaces
		while (c === ' ' || c === '\t' || c === '\r') {
			c = data.charAt(++i);
		}

		// go to the next row or column
		if (c === delimeter) {
			// to the next column
			col++;
		}
		else if (c === newline) {
			// to the next row
			col = 0;
			row++;
		}
		else if (c != eof) {
			// unexpected character
			throw "Delimiter expected after character " + i;
		}

		// go to the next character
		c = data.charAt(++i);
	}

	return array;
};

function writeModelsReport(model, report) {
	let pairs = exports.getModelsReports();
	pairs[model] = report;
	fs.writeFile(__dirname + '/' + 'Models-Reports.json', JSON.stringify(pairs), err=>{
		console.log(err);
	});
}

exports.getModelsReports = () => {
	try {
		let info = fs.readFileSync(__dirname + '/' + 'Models-Reports.json').toString();
		return JSON.parse(info);
	} catch(e){return {}}
};

exports.launchModels = async (data) => {
	let cmd = require('node-cmd'),
		bat_dir = 'C:\\scp\\12.2\\common\\start\\run_sno_snocon.bat',
		target_dir = 'C:\\Reports\\';
	if (!fs.existsSync(target_dir))
		fs.mkdirSync(target_dir);
	for (const val of data) {
		let model_name = val.model.slice(0, -4),
			report_file=val.report,
			process = cmd.get(bat_dir),
			imp_cmd =
				`import ${__dirname}\\Models\\${val.model}
			`,
			slv_cmd = `solve
			`,
			ld_cmd = `loadsmartgraph ${__dirname + '\\Reports\\' +  val.report}
			`,
			apply_cmd = `applysmartgraphs ${__dirname + '\\Reports\\' + val.report}
			`,
			exp_cmd = `exportsmartgraph  ${__dirname + '\\Reports\\' + val.report} ${target_dir + model_name + '_' + (new Date()).getTime() + '.csv'}
			`;
		process.stdout.on('data', function (data) {
			console.log(data.toString());
		});
		process.stderr.on('data', (data) => {
			console.log(data.toString());
		});
		process.stdin.write(imp_cmd + slv_cmd + ld_cmd + exp_cmd);
		writeModelsReport(val.model, report_file);
	}
};