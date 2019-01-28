let express = require('express');
let router = express.Router();
let fs = require('fs');
let app = require('../App/index');



/* GET home page. */
router.get('/', async function(req, res, next) {
	res.redirect('/upload_and_view');
});


router.post('/getFolder', (req,res)=>{
	let type = req.body.type,
		files = app.getFilesList(req.body.type);
	res.send({type, files});
});


router.post('/getContent', async function (req, res) {
	let src = fs.createReadStream(req.body.path);
	src.pipe(res);
});

/* upload and view */

let
	multer = require('multer'),

	storage = multer.diskStorage({
		destination: (req, file, cb) => {
			let dir = 'App/' + req.body.type;
			if (!fs.existsSync(dir))
				fs.mkdirSync(dir);
			cb(null, dir);
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname ? file.originalname : file.name);
		}
	}),
	upload = multer({storage : storage});

router.get('/upload_and_view', async function(req, res, next) {
	section = 'upvi';
	let content = app.getAppContent();
	res.render('viewpage', {content, mode: 'view'});

});

router.post('/upload_and_view/:mode', async (req, res)=> {
	let mode = req.params.mode;
	if (mode === 'upload')
		res.render('upload_html');
	else {
		let content = app.getAppContent();
		res.render('view_html', {content});
	}
});

router.post('/savelayout', (req, res)=>{
	upload_page_html = req.body.layout;
});

router.post('/upload', upload.single('file'), function (req, res) {
	let file = req.file;
	if(!req.body.reupload)
		return res.send('Успех');
	res.send(file.originalname + ' успешно изменён');
});

router.post('/download', async function (req, res) {
	await res.sendFile(req.body.filename, {root: req.body.root});
});

router.post('/delete', async function (req, res) {
	fs.unlink(req.body.path, (err)=>{
		if(err) return err;

		res.send(req.body.path + ' успешно удалён');
	});
});

/* linking */

router.get('/linking', (req,res) => {
	section = 'link';
	res.render('linking');
});

router.post('/process_files', async (req, res) => {
	//data = [{ template_file, data_file, row_splitter, new_row_splitter, out_dir }...]
	let data = JSON.parse(req.body.data);
	res.send('Файлы поступили на обработку');
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
	section = 'stat';
	let data = app.getLoggedModels();
	res.render('status', {logged_models:data});
});

router.get('/launch', (req,res)=>{
	section = 'launch';
	res.render('launch');
});


module.exports = router;