import express from "express";
import bodyParser from "body-parser";
import _ from 'lodash';

const app = express();
const port = 3000;

var title = [];
var body = [];

app.locals._ = _
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs", {title: title, body: body});
    //Step 1 - Make the get route work and render the index.ejs file.
  });

app.get("/compose", (req, res) => {
    res.render('compose.ejs')
  });

app.get("/posts/:postIndex", (req, res) => {
    const requestedIndex = _.toString(req.params.postIndex);
      res.render('post.ejs', {
        postTitle: title[requestedIndex],
        postBody: body[requestedIndex],
        postIndex: requestedIndex
        })
});

app.post("/compose", (req, res) => {
     title.push(req.body.postTitle);
     body.push(req.body.postBody);

     res.redirect("/");

     console.log(title);
     console.log(body);
});

app.get("/posts/delete/:postIndex", (req, res) => {
    const requestedIndex = _.toString(req.params.postIndex);
    if (requestedIndex > -1) { 
    title.splice(requestedIndex, 1); 
    body.splice(requestedIndex, 1);

    console.log(title);
    console.log(body);

    res.redirect("/");
}
});

app.get("/posts/edit/:postIndex", (req, res) => {
    const requestedIndex = _.toString(req.params.postIndex);
    res.render('edit.ejs', {
        postTitle: title[requestedIndex],
        postBody: body[requestedIndex],
        postIndex: requestedIndex
        })
});


app.post("/edit/:postIndex", (req, res) => {
    const requestedIndex = _.toString(req.params.postIndex);
    console.log(requestedIndex);

    title[requestedIndex] = req.body.postTitle;
    body[requestedIndex] = req.body.postBody;
    

    res.redirect("/");

    console.log(title);
    console.log(body);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  