var express = require('express');
var connection = require(process.cwd() + '/server/db.js');

var router = express.Router();
router.get('/career', function(req, res, next) {
  connection.query('SELECT * FROM career order by year DESC, month DESC', function(err, rows) {
    res.send(rows);
  });
});
//커리어 추가
router.post('/career', function(req, res, next) {
  console.log(req.body);
  connection.query(
    "INSERT INTO career (year, month, title) VALUES ('" + req.body.year + "','" + req.body.month + "','" + req.body.title + "');",
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

//커리어 삭제
router.delete('/career/:id', function(req, res, next) {
  connection.query("DELETE FROM career WHERE id=\"" + req.params.id + "\";", function(err, rows) {
    res.send({
      error: false
    });
  });
});



//커리어 수정
router.put('/career', function(req, res, next) {
  if (req.body.year)
    connection.query("UPDATE career SET year=\"" + req.body.year + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.month)
    connection.query("UPDATE career SET month=\"" + req.body.month + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.title)
    connection.query("UPDATE career SET title=\"" + req.body.title + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  res.send({
    error: false
  });
});
module.exports = router;
