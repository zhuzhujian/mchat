var express = require('express');
var router = express.Router();

var friendList = require('../db/friendList');
//导入mysql的基本连接
var mysql = require('../db/basicConnection');
//获取token
var Token = require('../utils/token');
router.get('/isFriend', function (req,res,next){
  const token = req.headers.authorization;
  let verify = Token.verifyToken(token);
  let friend_id = req.query.friend_id;
  if (verify === 'Token Invalid'){
    res.send({code: -1, message: '登录超时'});
  } else {
    const { account } = verify;
    let index = ['user_id', 'friend_id'];
    let value = [account, friend_id];
    let sql = friendList.select(index,value);
    mysql.query(sql,(args, feild) => {
      if(args.length > 0) {
        const response = {};
        response.data = {type: 1}
        response.code = 0;
        response.message = 'isFriend'
        res.send(response);
      }else{
        const response = {};
        response.data = {type: 0}
        response.code = 0;
        response.message = 'is not Friend'
        res.send(response);
      }
    })
  }
})

module.exports = router