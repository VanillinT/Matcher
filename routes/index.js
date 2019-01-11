var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/process_files', async function (req, res){
    let {rows, path} = req.body;
    let cnt = 0;
    rows.forEach(async function (row) {
    	await process({
			template_file: row.selected_template,
			data_file: row.selected_data,
			row_splitter: row.selected_splitter,
			new_row_splitter: row.selected_rowsym,
			out_file: path
		}).then((err, suc)=>{if(!err)cnt++;})
	});

});

router.post('/upload', upload.array('files'), async function (req, res) {
	console.log(req.files);
	res.json({'message': 'File uploaded successfully'});
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