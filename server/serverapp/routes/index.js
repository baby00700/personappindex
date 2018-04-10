var express = require('express');
var router = express.Router();
const https = require('https')
const Sequelize = require('sequelize');
const excelcon = require('./excelmodel')
const userinfo = require('./usermodel')
const Op = Sequelize.Op;
var identityKey = 'skey';

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.send(express)
    res.render('index', { title: 'Express' });
});

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://192.168.1.167:8081");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.post('/', function (req, res) {
    console.log('req.body', req.body);
    excelcon.findAll({
        attributes:[[Sequelize.literal('distinct `yjfl`'),'yjfl']]
    }).then(function (data) {
        res.send({datamsg: data});
    })
});

router.post('/ej', function (req, res) {
    console.log('req.body', req.body);
    excelcon.findAll({
        attributes:[[Sequelize.literal('distinct `ejfl`'),'ejfl']],
        where: {yjfl: req.body.jb},
    }).then(function (data) {
        res.send({datamsg: data});
    })
});

router.post('/sj', function (req, res) {
    console.log('req.body', req.body);
    excelcon.findAll({
        attributes:[[Sequelize.literal('distinct `sjfl`'),'sjfl']],
        where: {ejfl: req.body.jb},
    }).then(function (data) {
        res.send({datamsg: data});
    })
});

router.post('/sp', function (req, res) {
    console.log('req.body', req.body);
    excelcon.findAll({
        where: {sjfl: req.body.jb},
    }).then(function (data) {
        res.send({datamsg: data});
    })
});

router.post('/tq', function (req, res) {
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

router.get('/tq', function (req, res) {
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

router.post('/joinin', function (req, res) {
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

router.get('/tests', function (req, res) {
    req.session.regenerate(function (err) {
        if(err){
            res.send({success: false})
        }
        req.session.userid = '12312123'
        res.send({success: true})
    })
})

router.get('/testse', function (req, res) {
    console.log(req.session)
    res.send(req.session)
})


router.post('/loginin', function (req, res) {
    console.log('req.body', req.body);
    if (req.body.username === '') {
        if (req.session.userid) {
            res.send({success: true, msg: '', obj: ''})
        } else {
            res.send({success: false, msg: '', obj: ''})
        }
    } else {
        userinfo.findAll({
            where: {
                [Op.and]: [{username: req.body.username}, {userpsd: req.body.userpasswd}]
            }
            // where: {username: req.body.username}
        }).then(function (data) {
            if (data.length > 0) {
                console.log(req.session.userid)
                req.session.regenerate(function (err) {
                    if(err){
                        res.send({success: false, msg: '登录失败!', obj: data})
                    }
                    req.session.userid = data
                    req.session.save()
                    res.send({success: true, msg: '登录成功!', obj: data})
                })
                console.log(req.session.userid)
            } else {
                res.send({success: false, msg: '请检查用户名或密码是否正确！', obj: data})
            }
        })
    }
})


module.exports = router;
