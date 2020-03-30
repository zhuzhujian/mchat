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
})

module.exports = router;
