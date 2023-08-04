const express =require("express");
const { MongoClient,ObjectId  } = require('mongodb');
const server =express();
const url ="mongodb+srv://zaher:0JmtD2OZif1YcO5i@cluster0.mut2kja.mongodb.net/?retryWrites=true&w=majority";



// mongoose.connect(db,{useNewUrlParser: true , useUnifiedTopology: true })
// .then((result)=>console.log("true"))
// .catch((err)=>console.log(err));


var db =null

//DB connection 
async function DBconnect() {
  // Use connect method to connect to the server
  console.log('start connection');
  const client = new MongoClient(url); 
  await client.connect();
  db = client.db("Ahmed");
  console.log('Connected successfully to server');

  // the following code examples can be pasted here...
  server.listen(3000,()=>console.log("sever run"));
  return 'done.';
}




server.set("view engine","ejs");
server.use(express.static("public"));
server.use(express.urlencoded({extended:true}));



server.get("/",(req,res)=>{
  res.render("home",{title: "Home"});
})

server.get("/games",(req,res)=>{
res.render("games",{title: "Games" });
})

server.get("/learn",(req,res)=>{
  
  res.render("learn",{title: "Learn" });
})  


server.get("/store",(req,res)=>{
  
  res.render("Asset-Store-index",{title: "Asset store"});
})

server.get("/pricing",(req,res)=>{
  
  res.render("pricing",{title: "Pricing"});
})
  
server.get("/blog",async(req,res)=>{
  var results=[]
  try{
    collection  = db.collection('blog');
    results=await collection.find({}).toArray();
  }catch (error){
    console.log("failed to get data ",error)
  }
  res.render("blog",{title: "Blog",body:{},data:results})
})

server.post("/blog",async(req,res)=>{
try{
  collection  = db.collection('blog');
  await collection.insertOne({ name:req.body.name, mail:req.body.mail, message:req.body.message })
}catch(err){
  console.log(err)
}
var results=[]
try{
  collection  = db.collection('blog');
  results=await collection.find({}).toArray();
}catch (error){
  console.log("failed to get data ",error)
}
res.render("blog",{title: "Blog",data:results})
})


server.get("/register",(req,res)=>{
  
  res.render("Register",{title: "Register"});
})

server.get("/cart",(req,res)=>{
  
  res.render("cart",{title: "Cart"});
})

server.get("/login",(req,res)=>{
  
  res.render("Login",{title: "Login"});
})

server.use((req,res)=>{
  res.render("home",{title: "Home"});
})
DBconnect()



