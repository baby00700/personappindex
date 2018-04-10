var express = require('express')
var app = express()
const https = require('https')
const Sequelize = require('sequelize');
const excelcon = require('./excelmodel')
const userinfo = require('./usermodel')
var querystring = require('querystring');
var bodyParser = require('body-parser');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.post('/', function (req, res) {
    console.log('req.body', req.body);
    excelcon.findAll({
        attributes:[[Sequelize.literal('distinct `yjfl`'),'yjfl']]
    }).then(function (data) {
        res.send({datamsg: data});
    })
});

app.post('/ej', function (req, res) {
    console.log('req.body', req.body);
    excelcon.findAll({
        attributes:[[Sequelize.literal('distinct `ejfl`'),'ejfl']],
        where: {yjfl: req.body.jb},
    }).then(function (data) {
        res.send({datamsg: data});
    })
});

app.post('/sj', function (req, res) {
    console.log('req.body', req.body);
    excelcon.findAll({
        attributes:[[Sequelize.literal('distinct `sjfl`'),'sjfl']],
        where: {ejfl: req.body.jb},
    }).then(function (data) {
        res.send({datamsg: data});
    })
});

app.post('/sp', function (req, res) {
    console.log('req.body', req.body);
    excelcon.findAll({
        where: {sjfl: req.body.jb},
    }).then(function (data) {
        res.send({datamsg: data});
    })
});

app.post('/tq', function (req, res) {
    console.log('req.body', req.body);
    https.get('https://free-api.heweather.com/s6/weather/now?location=CN101240101&key=c02e162e32c4416f857b88d16200cbe3', function(reqs,ress) {
        console.log(ress)
        // console.log(reqs)
        var html='';  
        reqs.on('data',function(data){  
            html+=data;  
        });  
        reqs.on('end',function(){  
            console.log(html); 
            res.send(html);
        });  
    
    })
});


app.post('/joinin', function (req, res) {
    console.log('req.body', req.body);
    console.log(req.body.username)
    userinfo.count({where: {username: req.body.username}}).then(function (count) {
    	if (count >= 1) {
    		res.send({success: false,msg: '已存在重复的用户名!'});
    	} else {
    		userinfo
			    .build({username: req.body.username, userpsd: req.body.userpasswd, useremail: req.body.usermail, regtime: req.body.gendatetime})
			    .save()
			    .then(function () {
			      res.send({success: true,msg: '事务完成'});
			    })
			    .catch(error => {
			      console.log(error)
			      res.send({success: false,msg: '注册失败！'});
			    })
    	}
    })
})

app.post('/loginin', function (req, res) {
	console.log('req.body', req.body);
    console.log(req.body.username)
})

 var server = app.listen(3000, function () {
     var host = server.address().address
     var port = server.address().port
     console.log(host, port)
 })