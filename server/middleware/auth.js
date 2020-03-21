const {Usera} = require('../models/User')
let auth = (req,res,next) => {

  //인증처리를 하는곳
  //클라이언트 쿠키에서 토큰을 가져와
  let token = req.cookies.x_auth;
  //토큰을 복호화 해서 user를 찾아.
  Usera.findByToken(token, (err,user) =>{
    if(err) throw err;
    if(!user) return res.json({isAuth: false, error: true})
    
    req.token = token;
    req.user= user;
    next();
    
  })
  //user가 있으면 인증 okay
  //user가 없으면 no
}

module.exports = {auth};
