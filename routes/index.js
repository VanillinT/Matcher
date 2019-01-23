let express = require('express');
let router = express.Router();
let fs = require('fs');
let multer = require('multer');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let dir = 'App/' + req.body.type;
		if(!fs.existsSync(dir))
			fs.mkdirSync(dir);
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname ? file.originalname : file.name);
	}
});

let upload = multer({storage : storage});

function countChildren(path) {
	return getFoldersList(path).length;
}

function getFoldersList(path) {
	return fs.readdirSync(path).filter(function (file) {
		return fs.statSync(path+'/'+file).isDirectory();
	})
}

function getFilesList(path) {
	return fs.readdirSync(path);
}

/* GET home page. */
router.get('/', async function(req, res, next) {
	res.render('index');
});

router.get('/getAppContent', (req, res) => {
	let content = getAppContent();
	res.send({content});
});

router.post('/getFolder', (req,res)=>{
	let type = req.body.type, files = getFilesList('App/' + req.body.type);
	console.log(files);
	res.send({type, files});
});

function getAppContent(){
	let root = 'App/',
		folders = getFoldersList(root),
		content = [];
	for(let fol of folders) {
		let folder = {name: fol, files: []},
			files = getFilesList(root + fol);
		for(let fil of files){
			let file = {name: fil, root:root + fol, fullpath: root + fol + '/' + fil};
			folder.files.push(file);
		}
		content.push(folder);
	}
	return content;
}

router.post('/process_files', async function (req, res){
	res.json(getFoldersList('public/uploads'));
});

router.post('/delete', async function (req, res) {
	fs.unlink(req.body.path, (err)=>{
		if(err) return err;

		res.send(req.body.path + ' успешно удалён');
	});
});

router.post('/download', async function (req, res) {
	await res.sendFile(req.body.filename, {root: req.body.root});
});

router.post('/getContent', async function (req, res) {
	await fs.readFile(req.body.path, 'utf8', function (err, content) {
		if (err) return console.log(err);
		res.send(content);
	});
});

router.post('/upload', upload.single('file'), function (req, res) {
	let file = req.file;
	res.send(file.originalname + ' загружен в ' + file.destination);
});

router.post('/writeFile', function (req,res) {
	let path = req.body.path,
		text = req.body.text;
	fs.writeFile(path, text, function (err) {
		if(err) return res.send(err);

		res.send('Файл был успешно изменён');
	});
});

async function process(template_file, data_file, row_splitter, new_row_splitter, out_file) {
	var fs = require('fs')
		, es = require('event-stream');

	var lineNr = 0;

	var array_header = [];
	var dict_header = {};

	var template_b = fs.readFileSync(data_file);
	var template_string = template_b.toString("UTF-8");

	var fs = require('fs');
	var logger = fs.createWriteStream(out_file, {
		flags: 'a' // 'a' means appending (old data will be preserved)
	});

	var s =
		fs.createReadStream(template_file)
			.pipe(es.split())
			.pipe(es.mapSync(function (line) {

					// pause the readstream
					s.pause();

					if (lineNr == 0) {
						array_header = line.split(';');
						dict_header = array_header.reduce((p, x, i) => { p[i] = x; return p; }, {});
					}
					else {
						var array_values = line.split(row_splitter);
						array_values = array_values.map((x, i) => { return { v: x, h: dict_header[i] } });

						// делаем замену и дописываем выход
						var replaced_line = template_string;
						array_values.forEach((x, i) => {
							//h-исходное слово
							//v-новое значение
							if (x.h.length>0) {
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

					// resume the readstream, possibly from a callback
					s.resume();
				})
					.on('error', function (err) {
						console.log('Error while reading file.', err);
					})
					.on('end', function () {
						console.log('Read entire file.');
						logger.end();
					})
			);
}

module.exports = router;