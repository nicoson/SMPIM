const express	= require('express');
const router	= express.Router();
const log4js	= require('log4js');
const DBConn    = require('../model/DBConnection');
const appHelper = require('../model/appHelper');
const sconsole  = require('../model/sconsole');
let ah			= new appHelper();

// const fetch     = require('node-fetch');
// const config	= require('../model/config');


// const multer	= require('multer');
// const upload	= multer({ dest: config.UPLOAD_PATH });

log4js.configure({
	appenders: { info: { type: 'file', filename: 'index.log' } },
	categories: { 
		default: { 
			appenders: ['info'], 
			level: 'info' 
		}
	}
});
const logger = log4js.getLogger('esp');
logger.info('start server ...');

DBConn.createTable('products', ['uid']).then(e => sconsole.log(e));
DBConn.createTable('market', ['item','model','price','project_code','owner','winner']).then(e => sconsole.log(e));


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.get('/spider', function(req, res, next) {
	res.render('spider', { title: 'Express' });
});



/* ====================== *\
	  client side api 
\* ====================== */
router.get('/test', function(req, res, next) {
	res.send({
		code: 200
	});
});


//	softwares/components api
// ==============================
router.get('/pim/itemlist/:type', function(req, res, next) {
	ah.getDataFromDB('products',{type:req.params.type},9999).then(data => {
		// console.log('res: ',data);
		for(let i=0; i<data.res.length; i++) {
			delete data.res[i].modules;
		}
		res.send({
			code: 200,
			msg: 'done',
			data: data.res,
			count: data.num
		});
	}).catch(err => {res.send({code:500, err: err})});
});

router.post('/pim/getitemdetail', function(req, res, next) {
	ah.getDataFromDB('products',{uid:req.body.uid}).then(data => {
		console.log('res: ',data);
		res.send({
			code: 200,
			msg: 'done',
			data: data.num ? data.res[0]:null
		});
	}).catch(err => {res.send({code:500, err: err})});
});


router.post('/pim/updateitem', function(req, res, next) {
	ah.updateItems('products', [req.body.data]).then(data => {
		// console.log('res: ',data);
		res.send({
			code: 200,
			msg: 'done'
		});
	}).catch(err => {res.send({code:500, err: err})});
});


router.post('/pim/deleteitem', function(req, res, next) {
	ah.deleteDataFromTable('products', {type:req.body.type, uid:req.body.uid}).then(data => {
		// console.log('res: ',data);
		res.send({
			code: 200,
			msg: 'done'
		});
	}).catch(err => {res.send({code:500, err: err})});
});


//	hardwares/components api
// ==============================
router.post('/pim/updatehardwares', function(req, res, next) {
	ah.updateHardwares('products', [req.body.data]).then(data => {
		// console.log('res: ',data);
		res.send({
			code: 200,
			msg: 'done'
		});
	}).catch(err => {res.send({code:500, err: err})});
});



//	products api
// ==============================
router.get('/pim/droplist/:type', function(req, res, next) {
	ah.getDataFromDB('products', {type:req.params.type}, 9999).then(data => {
		// console.log('res: ',data);
		for(let i=0; i<data.res.length; i++) {
			delete data.res[i].info;
		}
		res.send({
			code: 200,
			msg: 'done',
			data: data.res,
			count: data.num
		});
	}).catch(err => {res.send({code:500, err: err})});
});


/* ==================================== *\
	  server side api for spider
\* ==================================== */
router.post('/spider/getdata', function(req, res, next) {
	let conditions = {};
	// 	$and: [
	// 		{create: {$gt: new Date(req.body.startDate)}},
	// 		{create: {$lt: new Date(new Date(req.body.endDate).getTime()+86400000)}},
	// 		{manualreview: true},
	// 		{type: req.body.type}
	// 	]
	// }

	// if(req.body.detectOption.length > 0) {
	// 	conditions['$and'].push({'rets.classes': {$in: req.body.detectOption}});
	// }

	// if(req.body.classifyOption.length > 0) {
	// 	conditions['$and'].push({'rets.classes': {$in: req.body.classifyOption}});
	// }
	
	console.log('conditions: ', JSON.stringify(conditions));
	ah.getDataFromDB('market', {}, req.body.pagesize, req.body.pagesize*(req.body.page)).then(data => {
		res.send({
			code: 200,
			data: data.res,
			num: data.num
		});
	}).catch(err => {res.send({code:500, err: err})});
});

router.post('/spider/senddata', function(req, res, next) {
	console.log('new data: ', req.body.data);
	ah.insertDataIntoTable('market', req.body.data).then(data => {
		console.log('res: ',data);
		res.send({
			code: 200,
			msg: 'done'
		});
	}).catch(err => {res.send({code:500, err: err})});
});


module.exports = router;
