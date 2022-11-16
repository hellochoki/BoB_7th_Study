var express = require('express');
var connection = require(process.cwd() + '/server/db.js');

var router = express.Router();
router.get('/history', function(req, res, next) {
  connection.query('SELECT * FROM history order by year, month', function(err, rows) {
    res.send(rows);
  });
});

//히스토리 추가
router.post('/history', function(req, res, next) {
  console.log(req.body);

  connection.query(
    "INSERT INTO history (year, month, content) VALUES ('" + req.body.year + "','" + req.body.month + "','" + req.body.content + "');",
    function(err, rows) {
      if (err)
        res.send({
          error: true
        });
      else
        res.send({
          error: false
        });
    });

});

//히스토리 삭제
router.delete('/history/:id', function(req, res, next) {
  connection.query("DELETE FROM history WHERE id=\"" + req.params.id + "\";", function(err, rows) {
    res.send({
      error: false
    });
  });
});


router.put('/history', function(req, res, next) {
  if (req.body.year)
    connection.query("UPDATE history SET year=\"" + req.body.year + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.month)
    connection.query("UPDATE history SET month=\"" + req.body.month + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.content)
    connection.query("UPDATE history SET content=\"" + req.body.content + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  res.send({
    error: false
  });
});
module.exports = router;
