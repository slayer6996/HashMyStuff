const express= require("express")
const bodyParser=require("body-parser")
const _=require("lodash")
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

var hashSet=[]
var posts=[]
var requestedPosts=[]

app.get("/",function(req,res){
    res.render("home", {posts:posts})
})

app.post("/", function(req,res){
    hashSet.length=0
    let hashes=req.body.hashes
    console.log(typeof hashes)
    hashset=hashes.split(" ")

    const postData={
        postName: req.body.postname,
        text: req.body.textarea,
        hashes: hashset
    };
    console.log(postData)
    posts.push(postData)
    res.redirect("/")
})

app.get("/find", function(req,res){
    res.render("find", {foundPosts:requestedPosts})
})

app.post("/find", function(req,res){
    requestedPosts.length=0
    let requestedHash=req.body.hash
    for(let i=0;i<posts.length;i++){
        for(let j=0;j<posts[i].hashes.length;j++){
            if(posts[i].hashes[j] === requestedHash){
                console.log("post found")
                requestedPosts.push(posts[i])
            }
        }
    }
    res.redirect("/find")
})

app.get("/post/:postname", function(req,res){
    requestedPosts.length=0
    const requestedPost= _.lowerCase(req.params.postname)
    for(let i=0;i<posts.length;i++){
        let storedTitle= _.lowerCase(posts[i].postName);
        if(requestedPost === storedTitle){
           requestedPosts.push(posts[i])
           res.redirect("/requestedpost")
        }
    }
        console.log("post not found")
})

app.get("/requestedpost",function(req,res){
    console.log(requestedPosts)
    res.render("post", {requestedPosts : requestedPosts})
})

app.listen(3000, function(){
    console.log("server running on port 3000")
})