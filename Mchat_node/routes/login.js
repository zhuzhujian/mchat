var express = require('express');
var router = express.Router();
// 导入user表的增删查改炒作语句
var user = require('../db/user');
//导入mysql的基本连接
var mysql = require('../db/basicConnection');

/* GET token listing. */
router.post('/login', function(req, res, next) {
  let index = ['account', 'password'];
  let value = [req.body.account, req.body.password]; // post专用
  console.log(req.cookies)
  let sql = user.select(index,value);
  mysql.query(sql,(args,feild) => {
    if(args.length > 0) {
      const response = {};
      response.data = args;
      response.code = 0;
      response.message = '登录成功'
      res.send(response);
    }else{
      res.send({code: -1, message: '登录失败'})
    }
  });
});

router.get('/info', function(req, res, next) {
  const token = req.Authorization
})

module.exports = router;