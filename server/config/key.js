if(process.env.NODE_ENV == ''){
  modouel.exports = require('./prod');
}else{
  module.exports = require('./dev');
}
1
