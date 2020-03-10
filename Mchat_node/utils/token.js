const jwt = require('jsonwebtoken')

const secretKey = 'M_CHAT' // 密钥
const createToken = (userName, password, expries) => {
  const payload = {
    userName: userName,
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