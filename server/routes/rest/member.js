var express = require('express');
var connection = require(process.cwd() + '/server/db.js');
var models = require('../../models');

var router = express.Router();


//회원 추가
router.post('/members', function(req, res, next) {
  console.log(req.body);

  connection.query(
    "INSERT INTO member (name, major, number, current, introduction, photo, createdAt, updatedAt) VALUES (\"" + req.body.name + "\",\"" + req.body.major + "\",\"" +
    req.body.number + "\",\"" + req.body.current + "\",\"" + req.body.introduction + "\",\"" + req.body.photo + "\",\"" + req.body.createdAt + "\",\"" + req.body.updatedAt + "\");",
    function(err, rows) {
      if (err) {
        res.send({
          error: true
        });
      } else {
        res.send({
          error: false
        });
      }
    });

});

//회원 수정
router.put('/members', function(req, res, next) {

  if (req.body.name)
    connection.query("UPDATE member SET name=\"" + req.body.name + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.major)
    connection.query("UPDATE member SET major=\"" + req.body.major + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.number)
    connection.query("UPDATE member SET number=\"" + req.body.number + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.current)
    connection.query("UPDATE member SET current=\"" + req.body.current + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.introduction)
    connection.query("UPDATE member SET introduction=\"" + req.body.introduction + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.photo)
    connection.query("UPDATE member SET photo=\"" + req.body.photo + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  res.send({
    error: false
  });
});

router.get('/members', function(req, res, next) {
  connection.query('SELECT * FROM member order by number DESC, name', function(err, rows) {
    res.send(rows);
  });
});

router.get('/members/current', function(req, res, next) {
  connection.query('SELECT * FROM member WHERE current = 1', function(err, rows) {
    res.send(rows);
  });
});

router.get('/members/number/:number_id', function(req, res, next) {
  connection.query('SELECT * FROM member WHERE number = ' + req.params.number_id, function(err, rows) {
    res.send(rows);
  });
});

router.get('/members/:member_id', function(req, res, next) {
  connection.query('SELECT * FROM member WHERE id =' + req.params.member_id, function(err, rows) {
    res.send(rows);
  });
});

//회원 삭제
router.delete('/members/:id', function(req, res, next) {
  connection.query("DELETE FROM member WHERE id=\"" + req.params.id + "\";", function(err, rows) {
    res.send({
      error: false
    });
  });

});


module.exports = router;
