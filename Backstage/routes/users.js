var express = require('express');
var router = express.Router();
var db = require('../modules/database');
var globalData = require('../global');
const formidable = require("formidable"); //处理post请求、文件上传
const {
    json
} = require('body-parser');


//登录
router.post('/login', function (req, res, next) {
    console.log(req.body.userName, req.body.userPwd, "req.body.userName, req.body.userPwd")
    db.query("select * from t_user where username=? and password=?", [req.body.userName, req.body.userPwd],
        function (err, results, fields) {
            if (err) {
                return res.end(err.message);
            } else {
                if (results.length > 0) { //若查询结果街的行数大于0，说明用户名密码匹配正确，则登录成功
                    //其他用户
                    console.log(results, "results")
                    res.cookie("username", results[0].username, { //服务端做一个cookie的存储
                        path: "/",
                        maxAge: 1000 * 60 * 60 //登陆状态保存时间
                    })
                    res.cookie("usrid", results[0].usrid, { //服务端做一个cookie的存储
                        path: "/",
                        maxAge: 1000 * 60 * 60 //登陆状态保存时间
                    })
                    res.setHeader("content-type", "text/html;charset=utf8");
                    res.json({
                        status: "0",
                        msg: "登陆成功",
                        result: {
                            username: results[0].username,
                            type: results[0].type,
                        }
                    })
                } else { //登录失败
                    res.setHeader("content-type", "text/html;charset=utf8");
                    res.end("<script>alert('登录失败!请重新登录！');window.location.href='/';</script>");
                }
            }
        }
    );
});
//退出登录
router.post('/logout', function (req, res, next) {
    db.query("select * from t_user where usrid=?", [req.body.usrid],
        function (err, results, fields) {
            if (err) {
                res.json({
                    status: "1",
                    msg: err.message
                })
            } else {
                if (results) {
                    res.clearCookie("username")
                    res.clearCookie("usrid")
                    res.json({
                        status: "0",
                        msg: "退出成功",
                    })
                } else {
                    res.json({
                        status: "-1",
                        msg: "退出失败",
                        result: ""
                    })
                }
            }
        }
    );
});
//注册
router.post('/register', function (req, res, next) {
    console.log(req.body);
    let user_id = abs();

    db.query('INSERT INTO T_user VALUES (?, ?, ?)',
        [req.body.userName, req.body.userPwd,user_id],
        function (err, results, fields) {
            if (err) {
                res.json({
                    msg: '注册失败'
                });
            } else {
                res.json({
                    msg: '注册成功',
                });
            }
        }
    );

});

//创建项目
router.post('/newproject', function (req, res, next) {
    // console.log(req.body);userId
    console.log(req.body.project_people, req.body.project_name,req.body.date,req.body.userId);

    let projeectId = abs();
    console.log(projeectId,req.body.project_people, req.body.project_name,req.body.date,req.body.userName);
    db.query('INSERT INTO T_project VALUES (?, ?, ?,?,?,?)',
        [projeectId,req.body.project_people, req.body.project_name,req.body.date,req.body.userId,req.body.userName],
        function (err, results, fields) {
            if (err) {
                res.json({
                    msg: '创建失败'
                });
            } else {
                res.json({
                    msg: '创建成功',
                });
            }
        }
    );

});
//查询项目--
router.get('/getOneTable', function (req, res, next) {
    var selectSql = "select * from T_project ";
    db.query(selectSql, function (err, resultTable, fields) {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else

            res.json(resultTable);
    });
});
//模糊项目--
router.post('/selectOneTable', function (req, res, next) {
    // var selectSql = `select * from  T_project project_name like '%6%'`;
    var selectSql = `select * from T_project where project_name like '%${req.body.table_name}%'`
    db.query(selectSql, function (err, resultTable, fields) {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else

            res.json(resultTable);
    });
});
// select * from user where realname like '%龙%
//查询私聊内容t_content
router.post('/getContent', function (req, res, next) {
    console.log(req.body.projectId,"req.body.projectId")
    var selectSql = "select * from t_content where projectId=?";
    db.query(selectSql,[req.body.projectId], function (err, resultTable, fields) {
        if (err) {
            console.error(err);
            res.status(500).end();
        } else

            res.json(resultTable);
    });
});
//创建项目
router.post('/insertContent', function (req, res, next) {
    // console.log(req.body);userId

    let id = abs();
    db.query('INSERT INTO t_content VALUES (?, ?, ?,?,?,?,?)',
        [req.body.content, req.body.createuser,req.body.createtname,req.body.projectId,req.body.userName,req.body.userId,id],
        function (err, results, fields) {
            if (err) {
                res.json({
                    msg: '创建失败'
                });
            } else {
                res.json({
                    msg: '创建成功',
                });
            }
        }
    );

});


function abs() {
    var arr = new Array();
    for (var i = 0; i < 5; i++) {
        var n = parseInt(Math.random() * 20 + 0);//随机生成整形数
        if (arr.length == 0) {
            arr.push(n);    //从末尾插入数组
        } else {
            if (arr.indexOf(n) < 0) {
                arr.push(n);
            } else {
                i--;
            }

        }
    }
    return arr.join("")
}









module.exports = router;