const express = require('express');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const countries = [
  "Portugal",
  "Spain",
  "Indonesia",
  "Finland",
  "Argentina"
];

const languages = [
  "portuguese",
  "spanish",
  "indonesian",
  "finnish",
  "spanish"
];


app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index',{name})
  } else {
    res.redirect('/hello')
  }
});

app.get('/cards', (req, res) => {
  res.render('card', {prompt: "Who is buried in Grant's Tomb?", hint: "Think about whose tomb it is."})
});

app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (!name) {
    res.render('hello')
  } else {
    res.redirect('/')
  }
});

app.post('/hello', (req, res) => {

  res.cookie('username', req.body.username)
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello')
})

app.get('/sandbox', (req, res) => {
  res.render('countries', { title: "Languages spoken in countries", countries, languages })
});

app.listen(3000, () => {
  console.log('This site is running on localhost:3000');
});
