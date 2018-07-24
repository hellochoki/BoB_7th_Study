var express = require('express');
var connection = require(process.cwd() + '/server/db.js');
var models = require('../../models');
var router = express.Router();
var session = require('express-session');
var svninfo = require('svn-info');
var config = require('../../config/config.json')[process.env.NODE_ENV || "development"];

router.use(session({
    key: 'dtbsessionkey',
    secret: '5c9SeCrEtKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

router.get('/session', function(req, res, next) {
    res.send(req.session.user);
});



router.post('/admin/loginCheck', function(req, res ,next) {
    console.log("login check!")
    models.user.findOne({
        where: {
            user_id: req.body.id,
            password: req.body.pass
        }
    }).then(function(user) {
        console.log("get user data")
        if(!user) {
            res.redirect('/admin/login');
        }
        var sess = req.session;

        sess.user = user.dataValues;
        console.log(sess.user);

        sess.auth = 1;

        res.redirect('/admin/main');
       

    })
});

/*
router.post('/admin/loginCheck', function(req, res, next) {
    console.log(req.body.id);
    console.log(req.body.pass);
    var sess = req.session;
    connection.query('SELECT * FROM user WHERE user_id =\'' + req.body.id + '\' and password=\''+req.body.pass+'\'', function(err, rows) {
        sess.auth = 0;
        if(rows.length == 1) {
            console.log(rows);
            sess.auth = 1;
            res.redirect('/admin/main');
        } else {
             res.redirect('/admin/login');
        }
    });
});
*/

router.all('/admin/*', function(req, res, next) {
    if (!req.originalUrl.includes('login') && req.session.auth != 1)
        res.redirect('/admin/login');
    else
        console.log(req.session.user);
        next();

});


router.get('/admin/logout', function(req, res, next) {
    req.session.destroy(function(err) {});
    res.redirect('/admin/login');
});

router.get('/admin/welcome', function(req, res, next) {
    var sess = req.session;
    if (sess.auth == 1) {
        if (sess.welcome != 1) {
            sess.welcome = 1;
            res.send('welcome');
        } else {
            res.send('not welcome');
        }
    } else {
        res.send('?');
    }
});

router.get('/admin/status', function(req, res, next) {
    var data = Object();
    connection.query('SELECT table_name, table_rows FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = \''+config.db.database+'\'', function(err, rows) {
        console.log(rows);
        rows.forEach(function(obj) {
            data[obj.table_name] = obj.table_rows;
        });
        walk('public', function(err, results) {
            if (err) throw err;
                data.file = results.length;
            svninfo('', 'HEAD', function(err, info) {
                if (err) {
                    data.revision = 'cannot find SVN in shell';
                    data.changeDate = 'cannot find SVN in shell';  
                } else {
                    data.revision = info.revision;
                    data.changeDate = info.lastChangedDate;
                }
                data.mode = process.env.NODE_ENV;
                res.send(data);
            });
        });
    });
});

//post put delete admin 아닐때 막는다
router.all('/*', function(req, res, next) {
    //로그인 안되어있으면 이상한거 보내줌
    if (req.method != 'GET' && checkUrl(req.originalUrl) && req.session.auth != 1)
        res.send('{}');
    else
        next();
});

//api list
function checkUrl(url) {
    if (url.includes('/history') || url.includes('/career') || url.includes('/members') || url.includes('/projects') || url.includes('/files'))
        return 1;
    return 0;
}

var fs = require('fs');
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
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

module.exports = router;
