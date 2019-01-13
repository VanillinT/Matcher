let express = require('express');
let router = express.Router();
let fs = require('fs');
let multer = require('multer');

let countModels = countChildren('public/uploads');

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		let dir = 'public/uploads/'+ countModels;
		if(!fs.existsSync(dir))
			fs.mkdirSync(dir);
		cb(null, dir);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

function countChildren(path) {
	return getFilesList(path).length;
}

function getFilesList(path){
	return fs.readdirSync(path).filter(function (file) {
		return fs.statSync(path+'/'+file).isDirectory();
	})
}

let upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/process_files', async function (req, res){
	res.json(getFilesList('public/uploads'));
	}
);

router.post('/upload', upload.array('files', 2), function (req, res) {
	let dir = 'public/uploads/'+ countModels;
	let spl = req.body.splitrow;
	let nr = req.body.newrow;
	let path = req.body.path;
	let template = req.files[0];
	let data = req.files[1];
	let metastr = JSON.stringify({template, data, spl, nr, path});
	fs.writeFile(dir + '/meta', metastr, 'utf8',(err) => {
		if(!err) {
			res.send('uploaded');
		} else res.send(err);
	});
	countModels++;
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