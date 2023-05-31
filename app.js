var express=require("express");
var bodyparser=require("body-parser");
var mongoose=require("mongoose"); 
const app=express();
app.use(bodyparser.json);
app.use(express.static('/public'));
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1/paperLessProject',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
var db=mongoose.connection;
db.on('error',()=>{
    console.log("Error in Database Connection");
}) 

db.once('open',()=>{
    console.log("Connected to the Database");
})


app.post("/signup",(req,res)=>{
    
    var name=req.body.name;
    var email=req.body.email;
    var pass=req.body.pass;
    var cpass=req.body.cpass;

    var data={
        "name":name,
        "email":email,
        "pass":pass,
        "cpass":cpass
    }
    db.collection('loginInfo').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    res.send('Data Received: ' + JSON.stringify(data));  
})

app.get("/",(req,res)=>{
    return res.redirect('http://127.0.0.1:5500/public/login.html');
}).listen(5500);