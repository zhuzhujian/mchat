
let user = {
  index: '',
  value: '',
  userCol: ['account', 'user_name', 'password', 'avatar', 'nick_name', 'phone', 'email', 'sex', 'sign_up_time', 'province', 'city', 'town'],
  list: 'SELECT * from user',
  
  insert(args){
    user.index = '';
    user.value = '';
    args = fliter(user.userCol, args);
    for(let key in args){
      user.index = `${user.index}${key},`;
      let reg = /^[0-9]+.?[0-9]*/;
      if(res.test(args[key])){
        user.value = `${user.value}${args[key]},`
      }else{
        user.value = `${user.value}'${args[key]}',`
      }
    };
    user.index = user.index.substr(0,user.index.length - 1);
    user.value = user.value.substr(0,user.value.length - 1);
    return `INSERT INTO user (${user.idnex}) VALUES (${user.value})`;
  },

  select(index, value){
    let term = '';
    let reg = /^[0-9]+.?[0-9]*/;
    if(Array.isArray(index) && Array.isArray(value)){
      if(reg.test(value[0])){
        term = `${term}${index[0]}=${value[0]}`;
      }else{
        term = `${term}${index[0]}='${value[0]}'`;
      }
      for(var i = 1; i < index.length; i++){
        if(reg.test(value[i])){
          term = `${term} AND ${index[i]}=${value[i]}`;
        }else{
          term = `${term} AND ${index[i]}='${value[i]}'`;
        }
      }
    }else{
      if(reg.test(value)){
        term = `${term}${index}=${value}`;
      }else{
        term = `${term}${index}='${value}'`;
      }
    }
    return `SELECT * FROM user WHERE ${term}`;
  },

  delete(index, value){
    let term = '';
    if(Array.isArray(index) && Array.isArray(value)){
      for(var i = 0; i < index.length; i++){
        term = `${term} AND ${index[i]}=${value[i]}`;
      }
    }else{
      term = `${term}${index}=${value}`;
    }
    return `DELETE * FROM user WHERE ${term}`;
  },

  update(index, args){
    if(index in args){
      user.value = '';
      args = fliter(user.userCol, args);
      for(let key in args){
        let reg = /^[0-9]+.?[0-9]+/;
        if(res.test(args[key])){
          user.value = `${user.value}${args[key]},`
        }else{
          user.value = `${user.value}'${args[key]}',`
        }
      };
      user.value = user.value.substr(0,user.value.length - 1);
      return `UPDATA user SET ${user.value} WHERE ${index}=${args[index]}`
    }
  }
}

function fliter(args, obj) {
  let res = {};
  args.forEach(item => {
    if(item in obj){
      res[item] = obj[item];
    }
  });
  return res;
};

module.exports = user;