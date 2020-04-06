var express = require('express');
var router = express.Router();

// 导入user表的增删查改炒作语句
var user = require('../db/user');
var code = require('../db/code')
//导入mysql的基本连接
var mysql = require('../db/basicConnection');
/* GET users listing. */
router.get('/search',function(req,res,next) {
  let data = req.query
  if(data.type){
    if(data.type === '1'){
      let sql = `select * from user where user_name like '%${data.huntKey}%'`;
      mysql.query(sql, (args,feild) => {
        let data = args;
        res.send({data, message: '查询成功', code: 0})
      })
    }else{
      let sql = `select * from user where account = '${data.huntKey}'`
      mysql.query(sql, (args,feild) => {
        let data = args;
        res.send({data, message: '查询成功', code: 0})
      })
    }
  }else{
    res.send({code: -1, message: '缺少type参数，请选择查询的类型'})
  }
})

//获取好友信息
router.get('/getUser', function (req, res, next) {
  let data = req.query
  if(data.account){
    let sql = `select * from user where account = '${data.account}'`
    mysql.query(sql, (args, feild) => {
      let data = args;
      res.send({data, message: '查询成功', code: 0})
    })
  }else{
    res.send({code: -1, message: '请求参数错误'})
  }
})
module.exports = router;
