var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/process_files', async function (req, res){
    let data = req.body;
    setTimeout(function () {
      res.send(data);
	}, 5000);
});

module.exports = router;