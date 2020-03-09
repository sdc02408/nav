const express =  require('express')
const app = express();
const port = 9000
const {User} = require('./models/User');
const bodyParser = require("body-parser");
const config = require('./config/key')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
  userNewUrlParser:true, useUnifiedTopology: true, userCreateIndex: true, userFindAndModify: false
}).then(() => console.log('mongodb connected ....'))
.catch(err => console.log(err))

app.get('/', (req,res) => res.send('hello world'))

app.post('/register', (req,res) => {
  //회원가입 할때 필요한 정보들을 client 에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err,userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success:true
    })
  })//정보들을 user에 저장
})

app.listen(port, () =>  console.log(`example app listening on port ${port}!`))
