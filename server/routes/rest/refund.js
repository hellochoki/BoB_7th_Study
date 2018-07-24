var express = require('express');
var connection = require(process.cwd() + '/server/db.js');
var models = require('../../models');

var router = express.Router();

router.get('/refund/dnjztlfwhqdk/:id', function(req, res, next) {
  connection.query('SELECT * FROM refund_20180330 where USERID = \"'+req.params.id+"\"", function(err, rows) {
    res.send(rows);
  });
});


router.get('/refund/dnjztlfwhqdk/:status', function(req, res, nmext) {
  connection.query("UPDATE refund_20180330 SET REFUNDED = "+req.params.status+" WHERE USERID = \""+req.params.id+"\"", function(err, rows) {
    res.send({
      error: false
    });
  });
});


module.exports = router;
