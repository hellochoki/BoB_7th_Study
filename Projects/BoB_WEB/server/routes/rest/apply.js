var express = require('express');
var connection = require(process.cwd() + '/server/db.js');

var router = express.Router();

router.get('/apply/status', function(req, res, next) {
    var x = new Object();
    x.btn = "지원하기";
    x.status = 0;
    x.file = "https://drive.google.com/drive/folders/1MCbWhYhs9jK65nXgpIMqSOZwUYxhFnH-";
    res.send(x);
});

module.exports = router;