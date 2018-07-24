var express = require('express');
var router = express.Router();
var fileUpload = require('express-fileupload');

var fs = require('fs');
var path = require('path');
var walk = function(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          var ff = new Object();
          ff.name = path.basename(file);
          ff.size = bytesToSize(fs.statSync(file).size);
          results.push(ff);
          next();
        }
      });
    })();
  });
};

router.use(fileUpload());

router.post('/admin/files/member', function(req,res,next) {
    let uploadFile = req.files.file;
    uploadFile.mv(process.cwd() + '/public/images/member/'+uploadFile.name, function(err) {
        if (err) return res.status(500).send(err);
        res.send('File uploaded!');
    });
});

router.post('/admin/files/project', function(req,res,next) {
    let uploadFile = req.files.file;
    uploadFile.mv(process.cwd() + '/public/images/project/'+uploadFile.name, function(err) {
        if (err) return res.status(500).send(err);
        res.send('File uploaded!');
    });
});


router.post('/admin/files/other', function(req,res,next) {
    let uploadFile = req.files.file;
    uploadFile.mv(process.cwd()+ '/public/other/'+uploadFile.name, function(err) {
        if (err) return res.status(500).send(err);
        res.send('File uploaded!');
    });
});


router.delete('/admin/files/member/:name', function(req,res,next) {
    fs.unlink('public/images/member/'+req.params.name,function(err){
       res.send('ok');
    });  
});

router.delete('/admin/files/project/:name', function(req,res,next) {
    fs.unlink('public/images/project/'+req.params.name,function(err){
        res.send('ok');
    });  
});


router.delete('/admin/files/other/:name', function(req,res,next) {
    fs.unlink('public/other/'+req.params.name,function(err){
       res.send('ok');
    });  
});


router.get('/admin/files/member', function(req,res,next) {
    walk('public/images/member', function(err, results) {
        res.send(results);
    });
});

router.get('/admin/files/project', function(req,res,next) {
    walk('public/images/project', function(err, results) {
        res.send(results);
    });
});

router.get('/admin/files/other', function(req,res,next) {
    walk('public/other', function(err, results) {
        res.send(results);
    });
});



router.post('/admin/gallery/icc', function(req,res,next) {
  console.log('gallery icc');
    console.log(req.files);

    let uploadFile = req.files.file;
    uploadFile.mv(process.cwd() + '/public/images/gallery_icc/'+uploadFile.name, function(err) {
        if (err) return res.status(500).send(err);
        res.send('File uploaded!');
    });
});

router.post('/admin/gallery/sw', function(req,res,next) {
  // console.log('gallery sw');
    let uploadFile = req.files.file;
    uploadFile.mv(process.cwd() + '/public/images/gallery_sw/'+uploadFile.name, function(err) {
        if (err) return res.status(500).send(err);
        res.send('File uploaded!');
    });
});



router.delete('/admin/gallery/icc/:name', function(req,res,next) {
    fs.unlink('public/images/gallery_icc/'+req.params.name,function(err){
       res.send('ok');
    });  
});

router.delete('/admin/gallery/sw/:name', function(req,res,next) {
    fs.unlink('public/images/gallery_sw/'+req.params.name,function(err){
        res.send('ok');
    });  
});

router.get('/admin/gallery/icc', function(req,res,next) {
    walk('public/images/gallery_icc', function(err, results) {
        res.send(results);
    });
});

router.get('/admin/gallery/sw', function(req,res,next) {
    walk('public/images/gallery_sw', function(err, results) {
        res.send(results);
    });
});

function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

module.exports = router;