let express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	app = require('../App/index'),
	path = require('path');



/* GET home page. */
router.get('/', (req, res) => {
	res.redirect('/upload_and_view');
});


router.post('/getFolder', (req,res)=>{
	let type = req.body.type,
		files = app.getFilesList(req.body.type);
	res.send({type, files});
});

router.post('/getText', (req, res) => {
	let path = req.body.path;
	let rs = fs.createReadStream(path);
	rs.pipe(res);
});
/* upload and view */

let
	multer = require('multer'),

	storage = multer.diskStorage({
		destination: (req, file, cb) => {
			let dir = req.body.folder;
			if (!fs.existsSync(dir))
				fs.mkdirSync(dir);
			cb(null, dir);
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname ? file.originalname : file.name);
		}
	}),
	upload = multer({storage : storage});

router.get('/upload_and_view', (req, res) => {
	res.redirect('/upload_and_view/view');
});

router.post('/upload_and_view', (req, res) => {
	let content = app.getAppContent();
	res.render('uploadandview_html', {content, mode:'view'});
});

router.get('/upload_and_view/:mode', (req, res, next) => {
	global.section = 'upvi';
	let mode = req.params.mode;
	if (mode === 'upload') {
		res.render('uploadpage', {mode});
	}
	else {
		let content = app.getAppContent();
		res.render('viewpage', {content, mode});
	}

});

router.post('/upload_and_view/:mode', async (req, res)=> {
	let mode = req.params.mode;
	if (mode === 'upload') {
		res.render('uploadpage_html');
	}
	else {
		let content = app.getAppContent();
		res.render('viewpage_html', {content});
	}
});

router.get('/getAppFolders', (req,res)=>{
	let folders = app.getFoldersList();
	res.send(folders);
});

router.post('/getViewModal', async function (req, res) {
	let ext = path.extname(req.body.path),
		file_name = req.body.filename;
	if (ext === '.csv')
		fs.readFile(req.body.path,(err, content) => {
			if (err) return;
			let array = app.csv2array(content.toString(), ';');
			res.render('csv_viewmode_modal', {file_name, array});
		});
	else res.render('viewmode_modal', {file_name});
});

router.post('/upload', upload.single('file'), function (req, res) {
	let file = req.file;
	if(!req.body.reupload)
		res.render('toast',{header: 'Загружено', message:`${file.originalname} успешно загружен`});
	else
		res.render('toast',{header: 'Изменено', message:file.originalname + ' успешно изменён'});
});

router.post('/download', async function (req, res) {
	await res.sendFile(req.body.filename, {root: req.body.root});
});

router.post('/delete', async function (req, res) {
	fs.unlink(req.body.path, (err)=>{
		if(err) return err;
		let split_path = req.body.path.split('/'),
			filename = split_path[split_path.length-1];

		let files_left = app.getFilesList(req.body.folder);
		if(!(files_left.length > 0))
			fs.rmdir('App/' + req.body.folder);

		res.render('toast', {header:'Удалено', message:`${filename} успешно удалён`});
	});
});

/* linking */

router.get('/linking', (req,res) => {
	global.section = 'link';
	res.render('linking');
});

router.post('/linking', (req,res) => {
	global.section = 'link';
	res.render('linking_html');
});

router.post('/process_files', async (req, res) => {
	//data = [{ template_file, data_file, row_splitter, new_row_splitter, out_dir }...]
	let data = JSON.parse(req.body.data);
	res.render('toast',{header:'Файлы поступили на обработку'});
	app.appendLog(data);
	await processData(data);
});

async function processData(data){
	for (let set of data) {
		await app.process(set);
	}
}

/* status */

router.get('/status', (req, res) => {
	global.section = 'stat';
	let data = app.getLoggedModels();
	res.render('status', {logged_models:data});
});

router.post('/status', (req, res) => {
	global.section = 'stat';
	let data = app.getLoggedModels();
	res.render('status_html', {logged_models:data});
});

router.post('/deletestatus', (req,res) => {
	let status_id = req.body.id;
	app.deleteLog(status_id).then(
		fine => {
			res.send(`Статус ${status_id} успешно удалён`)
		},
		rej => {
			res.send(rej)
		});
});

/* launch */
router.get('/launch', (req,res) => {
	section = 'launch';
	res.render('launch');
});

router.post('/launch', (req,res) => {
	section = 'launch';
	res.render('launch_html');
});


module.exports = router;