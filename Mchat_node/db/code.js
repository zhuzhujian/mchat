let code = {
  value: '',
  index: '',
  codeCol : ['code_id', 'status', 'type'],
  getRandCode: 'SELECT code_id FROM code WHERE type = 1 AND status = 0 ORDER BY RAND() LIMIT 1',
  
  /**
 * 
 * @param String index Primary Key
 * @param Object args updata Obj
 */
  update(index, args){
    if(index in args){
      code.value = '';
      args = fliter(code.codeCol, args);
      for(let key in args){
        let reg = /^[0-9]+(\.[0-9]+)?/;
        if(reg.test(args[key])){
          code.value = `${code.value}${key}=${args[key]},`
        }else{
          code.value = `${code.value}${key}='${args[key]}',`
        }
      };
      code.value = code.value.substr(0,code.value.length - 1);
      return `UPDATE code SET ${code.value} WHERE ${index}=${args[index]}`
    }
  }
};

function fliter(args, obj) {
  let res = {};
  args.forEach(item => {
    if(item in obj){
      res[item] = obj[item];
    }
  });
  return res;
};

module.exports = code;