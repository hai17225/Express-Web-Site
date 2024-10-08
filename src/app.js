require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const BLOGS = require('./blogs');
const ARTISTS = require(`./artists`)

const app = express();
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
      }
    }
  }));
app.use(bodyParser.urlencoded({ extended: false }));

// Configure mustache
app.set('views', `${__dirname}/pages`);
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

// Render the template
app.get('/', (req, res) => {
    res.render("index", { blogs: BLOGS});
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const matchedBlog = BLOGS.find(blog => blog.id.toString() === id);
    res.render('blog', { blog: matchedBlog });
})

app.get("/about", (req, res) => {
    res.render(`about`);
})

app.get("/learnmore", (req, res) => {
  res.render(`learnmore`);
})

app.get("/signup", (req, res) => {
  res.render(`signup`);
})

app.get("/artists", (req, res) => {
  res.render(`artist`, { artists: ARTISTS});
})

app.get("/career", (req, res) => {
  res.render(`career`);
})

app.get("/company", (req, res) => {
  res.render(`company`);
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`)
})
