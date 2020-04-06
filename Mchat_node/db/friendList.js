let friendList = {
  index: '',
  value: '',
  friendCol: ['user_id', 'friend_id', 'type'],
  list: 'SELECT * from friend_list',

  /**
   * @param {colName: value} args 键值对
   */
  insert(args){
    friendList.index = '';
    friendList.value = '';
    args = fliter(friendList.friendCol, args);
    for(let key in args){
      friendList.index = `${friendList.index}${key},`;
      let reg = /^[0-9]+(\.[0-9]+)?/;
      if(reg.test(args[key])){
        friendList.value = `${friendList.value}${args[key]},`;
      }else{
        friendList.value = `${friendList.value}'${args[key]}',`;
      }
    };
    friendList.index = friendList.index.substr(0,friendList.index.length - 1);
    friendList.value = friendList.value.substr(0,friendList.value.length - 1);
    console.log(`INSERT INTO friend_list (${friendList.index}) VALUES (${friendList.value})`)
    return `INSERT INTO friend_list (${friendList.index}) VALUES (${friendList.value})`;
  },

  /**
   * @param Array || String index 键名
   * @param Array || String value 键值
   */
  select(index, value){
    let term = '';
    let reg = /^[0-9]+(\.[0-9]+)?/;
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
    return `SELECT * FROM friend_list WHERE ${term}`;
  },

  /**
   * @param Array || String index 键名
   * @param Array || String value 键值
   */
  delete(index, value){
    let term = '';
    if(Array.isArray(index) && Array.isArray(value)){
      for(var i = 0; i < index.length; i++){
        term = `${term} AND ${index[i]}=${value[i]}`;
      }
    }else{
      term = `${term}${index}=${value}`;
    }
    return `DELETE * FROM friend_list WHERE ${term}`;
  },

  /**
   * 
   * @param String index Primary Key
   * @param Object args updata Obj
   */
  update(index, args){
    if(index in args){
      friendList.value = '';
      args = fliter(friendList.friendCol, args);
      for(let key in args){
        let reg = /^[0-9]+(\.[0-9]+)?/;
        if(reg.test(args[key])){
          friendList.value = `${friendList.value}${key}=${args[key]},`
        }else{
          friendList.value = `${friendList.value}${key}='${args[key]}',`
        }
      };
      friendList.value = friendList.value.substr(0,friendList.value.length - 1);
      return `UPDATE friend_list SET ${friendList.value} WHERE ${index}=${args[index]}`
    }
  }
}

/**
 * @param Array args 
 * @param Object obj 
 */
function fliter(args, obj) {
  let res = {};
  args.forEach(item => {
    if(item in obj){
      res[item] = obj[item];
    }
  });
  return res;
};

module.exports = friendList;