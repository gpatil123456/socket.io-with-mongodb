const mongoose=require('mongoose');
const Msg=require('./models/message');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


const  mongoDB ='mongodb://localhost:27017/admin';
mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
console.log('conected');
}).catch(err => console.log(err))


app.get('/', function(req, res) {
  
   res.sendFile('/home/dell/socket with api/index.html')

})


io.on('connection', socket => {
    console.log('User Connected')

   socket.on('chat', msg => {
      
       const message = new Msg({msg})
       message.save().then(() => {
           io.emit('chat', msg)
       }).catch(err => console.log(err))
       
     })
})

http.listen(3000, function(){
   console.log('listening on localhost:3000');
});
