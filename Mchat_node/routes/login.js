var express = require('express');
var router = express.Router();
// 导入user表的增删查改炒作语句
var user = require('../db/user');
//导入mysql的基本连接
var mysql = require('../db/basicConnection');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let query = req.query;
  let index = [];
  let value = [];
  let data = 1;
  for(var key in query){
    index.push(key);
    value.push(query[key]);
  }
  let sql = user.select(index,value);
  mysql.query(sql,(args,feild) => {
    data = args;
    res.send({data});
  });
});

module.exports = router;