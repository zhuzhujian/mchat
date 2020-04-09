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

router.post('/addFriend', (req, res, next) => {
  const token = req.headers.authorization;
  let verify = Token.verifyToken(token);
  let friend_id = req.body.account;
  if (verify === 'Token Invalid'){
    res.send({code: -1, message: '登录超时'});
  } else {
    let obj = {user_id: verify.account, friend_id: friend_id, type: 1};
    let sql = friendList.insert(obj);
    mysql.query(sql, (args, feild) => {
      if(args){
        res.send({code: 0, message: '添加成功'})
      }else{
        res.send({code: -1, message: '添加失败，该用户已经是好友'})
      }
    })
  }
})

router.get('/FriendList', (req, res, next) => {
  const token = req.headers.authorization;
  let verify = Token.verifyToken(token);
  if (verify === 'Token Invalid'){
    res.send({code: -1, message: '登录超时'});
  } else {
    let value = verify.account;
    let sql = `select account, user_name, password, avatar, signature, phone, email, sex, sign_up_time, province, city, town, type from user left join friend_list on user.account = friend_list.friend_id where user_id = ${value}`
    mysql.query(sql, (args, feild) => {
      if(args){
        let data = args;
        res.send({code: 0, message: '获取成功', friendList: data})
      }else{
        res.send({code: -1, message: '获取失败'})
      }
    })
  }
})
module.exports = router