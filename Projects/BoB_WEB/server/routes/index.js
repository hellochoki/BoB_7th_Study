var config = require('../config/config.json')[process.env.NODE_ENV || "development"];
var viewPath = config.path;
var express = require('express');
var router = express.Router();

router.use('/', require('../routes/rest/admin.js'));
router.use('/', require('../routes/rest/about.js'));
router.use('/', require('../routes/rest/apply.js'));
router.use('/', require('../routes/rest/career.js'));
router.use('/', require('../routes/rest/history.js'));
router.use('/', require('../routes/rest/member.js'));
router.use('/', require('../routes/rest/project.js'));
router.use('/', require('../routes/rest/users.js'));
router.use('/', require('../routes/rest/file.js'));
router.use('/', require('../routes/rest/gallery.js'));
router.use('/', require('../routes/rest/refund.js'));

module.exports = router;