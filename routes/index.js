let express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	app = require('../App/index'),
	path = require('path');



/* GET home page. */
router.get('/', (req, res) => {
	res.redirect('/upload_and_view');
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
			try {
				let array = app.csv2array(content.toString(), ';');
				res.render('csv_viewmode_modal', {file_name, array});
			} catch (e) {
				res.status(500);
				res.render('toast', {header: 'Ошибка', message: 'Файл неопределённого формата', error: true});
			}
		});
	else res.render('viewmode_modal', {file_name});
});

router.post('/upload', upload.single('file'), function (req, res) {
	let file = req.file;
	if(!req.body.reupload)
		res.render('toast',{header: 'Загружено', message:`${file.originalname} загружен`});
	else
		res.render('toast',{header: 'Изменено', message:file.originalname + ' изменён'});
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

		res.render('toast', {header:'Удалено', message:`${filename} удалён`});
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

router.post('/save_li_state', (req, res)=>{
	let data = req.body.data;
	fs.writeFile('App/linking_rows', data, (err)=>{
		if(!err)
			res.render('toast', {header: 'Состояние сохранено'});
	});
});

router.get('/get_li_state', (req,res)=>{
	fs.readFile('App/linking_rows', (err, data)=>{
		if(!err)
			res.send(data);
	});
});

router.post('/get_file_list_modal', (req,res)=>{
	let folder = req.body.folder,
		files = app.getFilesList(folder);
	res.render('file_list_modal', {folder, files});
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
			let message = status_id === '-1' ? 'Все статусы удалены' : `Статус ${status_id} удалён`;
			res.render('toast', {header: message})
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