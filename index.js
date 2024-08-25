import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var posts = [];
var title;
var id = 0;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", (req, res) => {
  var post = {
    id: id,
    title: title,
    content: req.body["pContent"],
    date: req.body["pDate"],
  };
  posts.push(post);
  console.log(posts);
  id++;

  res.render("index.ejs", { posts: posts });
});

app.post("/newPost", (req, res) => {
  title = req.body["newPostTitle"];
  res.render("newPost.ejs", { title: title });
});

app.get("/post/:id", (req, res) => {
    console.log("Showing post.");
    var currentPost = posts[req.params.id];
    console.log(currentPost);
    res.render("post.ejs", {cPost: currentPost});
});

app.post("/post/:id", (req, res) => {
  posts.splice(req.params.id, 1);
  console.log(posts);
  res.render("index.ejs", { posts: posts });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
