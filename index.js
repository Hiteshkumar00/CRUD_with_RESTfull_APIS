const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require('uuid');
const methodOveride = require("method-override");


app.use(express.urlencoded({extended: true}));
app.use(methodOveride("_method"));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//database
let posts = [
  {
    id: uuidv4(),
    username: "apnacollege",
    content: "I love coding!"
  },
  {
    id: uuidv4(0),
    username: "shardhakhapra",
    content: "Hard work is important to achive success"
  },
  {
    id: uuidv4(),
    username: "hiteshkumar",
    content: "I got selected for my 1st internship!"
  },
];


//index
app.get("/posts", (req, res)=>{
  res.render("index.ejs", { posts });
});

//add new post
app.get("/posts/new", (req, res)=>{
  res.render("new.ejs");
});

//update database
app.post("/posts", (req, res)=>{
  let post = req.body;
  post.id = uuidv4();
  posts.push(post);
  res.redirect("/posts");
});

//view post by id
app.get("/posts/:id", (req, res)=>{
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("show.ejs", { post });
}); 

//edit form
app.get("/posts/:id/edit", (req, res)=>{
  let { id } = req.params;
  let post = posts.find((p) => p.id === id);
  res.render("edit.ejs", { post });
});

//update post
app.patch("/posts/:id", (req, res)=>{
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = newContent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
})

app.listen(port, () => {
  console.log(`Listening to port : ${port}.`);
});