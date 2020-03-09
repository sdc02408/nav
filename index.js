const express =  require('express')
const app = express();
const port = 9000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://youtubeclone:yang0147@cluster0-kbpsx.mongodb.net/test?retryWrites=true&w=majority',{
  userNewUrlParser:true, useUnifiedTopology: true, userCreateIndex: true, userFindAndModify: false
}).then(() => console.log('mongodb connected ....'))
.catch(err => console.log(err))

app.get('/', (req,res) => res.send('hello world'))

app.listen(port, () =>  console.log(`example app listening on port ${port}!`))
