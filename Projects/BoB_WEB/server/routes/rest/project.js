var express = require('express');
var connection = require(process.cwd() + '/server/db.js');
var models = require('../../models');

var router = express.Router();

//프로젝트 추가
router.post('/projects', function(req, res, next) {
  console.log(req.body);
  connection.query(
    "INSERT INTO project (name, member, introduction, img) VALUES ('" + req.body.name + "','" + req.body.member + "','" + req.body.introduction + "','" + req.body.img + "');",
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

//프로젝트 수정

router.put('/projects', function(req, res, next) {
  if (req.body.name)
    connection.query("UPDATE project SET name=\"" + req.body.name + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.member)
    connection.query("UPDATE project SET member=\"" + req.body.member + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.img)
    connection.query("UPDATE project SET img=\"" + req.body.img + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});

  if (req.body.introduction)
    connection.query("UPDATE project SET introduction=\"" + req.body.introduction + "\" WHERE id=\"" + req.body.id + "\";", function(err, rows) {});
  res.send({
    error: false
  });
});

router.get('/projects', function(req, res, next) {
  connection.query('SELECT * FROM project', function(err, rows) {
    res.send(rows);
  });
});

router.get('/projects/:id', function(req, res, next) {
  connection.query('SELECT * FROM project WHERE id =' + req.params.id, function(err, rows) {
    res.send(rows);
  });
});

//프로젝트 삭제
router.delete('/projects/:id', function(req, res, nmext) {
  console.log("DELETE FROM project WHERE id=\"" + req.params.id + "\";");
  connection.query("DELETE FROM project WHERE id=\"" + req.params.id + "\";", function(err, rows) {
    res.send({
      error: false
    });
  });
});


module.exports = router;
