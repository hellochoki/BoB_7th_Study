var express = require('express');
var connection = require(process.cwd() + '/server/db.js');
var router = express.Router();


router.get('/about/intro', function(req, res, next) {
  res.send('시스템 컨설턴트 그룹 이하 SCG는 성균관대학교 소프트웨어대학 산하 학생협력단체로, 성균관대학교 소프트웨어대학에서 요구되는 홈페이지 및 여러 서비스에 필요한 서버와 시스템을 관리하며 그 외 교내외의 IT 관련 컨설팅, 시스템 구축에 관한 다양한 업무를 맡고 있습니다.');
});

router.get('/about/history', function(req, res, next) {
  connection.query('SELECT * FROM history', function(err, rows) {
    res.send(rows);
  });
});

router.get('/about/career', function(req, res, next) {
  connection.query('SELECT * FROM career', function(err, rows) {
    res.send(rows);
  });
});


router.get('/about/career/:career_id', function(req, res, next) {
  connection.query('SELECT * FROM career WHERE id =' + req.params.career_id, function(err, rows) {
    res.send(rows);
  });
});

router.post('/about/career', function(req, res, next) {
  res.send("page to add career");

});

router.put('/about/career/:career_id', function(req, res, next) {
  res.send("page to modify career");

});

router.delete('/about/career/:career_id', function(req, res, next) {


});

router.get('/about/members')


module.exports = router;
