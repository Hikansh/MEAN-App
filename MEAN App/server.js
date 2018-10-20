const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');

var index=require('./routes/index');
var tasks=require('./routes/tasks');

var port=3000;

const app=express();

//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//Set static folder(for angular stuff)
app.use(express.static(path.join(__dirname,'client/mean-app/dist/mean-app')));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port,()=>{
    console.log('Server started on port '+ port);
    
})