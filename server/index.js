const express =  require('express')
const app = express();

const {Usera} = require('./models/User');
const bodyParser = require("body-parser");
const config = require('./config/key')
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/auth');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  userNewUrlParser:true, useUnifiedTopology: true, userCreateIndex: true, userFindAndModify: false
}).then(() => console.log('mongodb connected ....'))
.catch(err => console.log(err))

app.get('/', (req,res) => res.send('hello world'))

app.get('/api/hello', (req,res) => {
  res.send("안녕하세요")
})

app.post('/api/users/register', (req,res) => {
  //회원가입 할때 필요한 정보들을 client 에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new Usera(req.body)
  user.save((err,userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success:true
    })
  })//정보들을 user에 저장
})

app.post('/api/users/login', (req,res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
   Usera.findOne({email:req.body.email}, (err,user) => {
     if(!user){
       return res.json({
         loginSuccess: false,
         message: "제공된 이메일에 해당하는 유저가 없습니다."
       })
     }
     //요청된 이메일이 db에 있다면 비밀번호가 맞는 비밀번호 인지 확인
    user.comparePassword(req.body.password, (err,isMatch) =>{
      if(!isMatch)
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸다"})
  
      //비밀번호 까지 맞다면 토큰생성.
      user.generateToken((err,user) => {
        if(err) return res.status(400).send(err);
        
        //토큰을  저장한다. 쿠키나 로컬 스토리지
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      })
    })
   })
})

//role 1 어드민 role2 특정 부서 어드민
//role 0 dlfqks dbwj role 0이 아니면 관리자
app.get('/api/users/auth', auth, (req,res) => {
//여기까지 미들웨어를 통과해 왔다는 얘기는 authenticaton이 true 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin:req.user.role === 0 ? false : true,
    isAuth: true,
    email:req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
    
  })
})

app.get('/api/users/logout', auth, (req,res) => {
  Usera.findOneAndUpdate({_id:req.user._id},
    {token:""},
    (err,user) => {
    if(err) return res.json({success:false, err});
    return res.status(200).send({
      success: true
    })
    })
})
const port = 9000
app.listen(port, () =>  console.log(`example app listening on port ${port}!`))
