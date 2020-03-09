// mysql连接池配置文件
// 主要使用于多表的复杂查询
var mysql = require('mysql');
var $dbConfig = require('../config/mysql');

//利用线程池，避免开太多的线程，开销太大
var pool = mysql.createPool($dbConfig);

/**
 * 封装不带占位符的query
 */
function query(sql, callback) {
  pool.getConnection((err,connection) => {
    if(err){
      console.log('数据库连接错误!')
      console.log(err);
    }
    connection.query(sql,(err,rows,field) => {
      if(err){
        console.log('数据操作错误!');
        console.log(err);
      }
      callback && callback(JSON.parse(JSON.stringify(rows)), JSON.parse(JSON.stringify(field)));
    });
    connection.release(err => {
      if (err) {
        console.log('数据库关闭错误!');
        console.log(err);
      }
    });
  });
}

/**
 * 封装带占位符的query
 */
function queryArgs(sql, args, callback) {
  pool.getConnection((err,connection) => {
    if(err){
      console.log('数据库连接错误!');
      console.log(err);
    }
    connection.query(sql,args,(err,rows,field) => {
      if(err){
        console.log('数据操作错误!');
        console.log(err);
      }
      callback && callback(JSON.parse(JSON.stringify(rows)), JSON.parse(JSON.stringify(field)));
    });
    connection.end(err => {
      if (err) {
        console.log('数据库关闭错误!');
        console.log(err);
      }
    });
  });
}

module.exports = {
  query,
  queryArgs
}