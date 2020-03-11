var express = require('express');
var Token = require('../utils/token')

var router = express.Router();
// 导入user表的增删查改炒作语句
var user = require('../db/user');
//导入mysql的基本连接
var mysql = require('../db/basicConnection');

/* GET token listing. */
router.post('/login', function(req, res, next) {
  let index = ['account', 'password'];
  let value = [req.body.account, req.body.password]; // post专用
  const account = req.body.account;
  const password = req.body.password;
  let sql = user.select(index,value);
  mysql.query(sql,(args,feild) => {
    if(args.length > 0) {
      let token = Token.createToken(account, password, 60*60*24)
      const response = {};
      response.data = { token };
      response.code = 0;
      response.message = '登录成功'
      res.send(response);
    }else{
      res.send({code: -1, message: '登录失败'})
    }
  });
});

router.get('/info', function(req, res, next) {
  const token = req.headers.authorization;
  let verify = Token.verifyToken(token);
  if (verify === 'Token Invalid'){
    res.send({code: -1, message: '登录超时'});
  } else {
    const { account, password } = verify;
    let index = ['account', 'password'];
    let value = [account, password];
    let sql = user.select(index,value);
    mysql.query(sql,(args, feild) => {
      if(args.length > 0) {
        const response = {};
        response.data = args[0];
        response.code = 0;
        response.message = '查询成功'
        res.send(response);
      }else{
        res.send({code: -1, message: '查询失败'})
      }
    })
  }
})

module.exports = router;