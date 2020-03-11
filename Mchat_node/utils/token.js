const jwt = require('jsonwebtoken')

const secretKey = 'M_CHAT' // 密钥
const createToken = (account, password, expries) => {
  const payload = {
    account: account,
    password: password
  };
  let token = jwt.sign(payload, secretKey, {expiresIn: expries});
  return token;
}

const verifyToken = (token) => {
  let verify = jwt.verify(token, secretKey, (err, decode) => {
    if(err){
      return 'Token Invalid';
    }else{
      return decode;
    }
  })
  return verify;
}

module.exports = {
  createToken,
  verifyToken
}