const express= require("express")
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const _=require("lodash")
const textToHashesArray= require(__dirname+"textToHashesArray.js")
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology:true})

var hashSet=[]
var posts=[]

app.get("/",function(req,res){
    res.render("home", {posts:posts})
})

app.post("/", function(req,res){
    hashSet.length=0
    let hashes=req.body.hashes
    hashSet=textToHashesArray.textToHashes(hashes)

    const postData={
        postName: req.body.postname,
        text: req.body.textarea,
        hashes: hashSet
    };
    posts.push(postData)
    res.redirect("/")

})

app.get("/post/:postname", function(req,res){
    const requestedPost= _.lowerCase(req.params.postname)
    let flag=0
    for(let i=0;i<posts.length;i++){
        if(requestedPost === posts[i].postName){
            console.log("post found")
            flag=1
            res.render("post", {postTitle: posts[i].postName, postText:posts[i].text})
        }
    }
    if(flag===0){
        console.log("post not found")
    }
})

app.listen(3000, function(){
    console.log("server running on port 3000")
})