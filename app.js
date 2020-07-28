const express = require('express');

const app = express();

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
  res.render('index')
});

app.get('/cards', (req, res) => {
  res.render('card', {prompt: "Who is buried in Grant's Tomb?", hint: "Think about whose tomb it is."})
});

app.get('/hello', (req, res) => {
  res.render('hello', {prompt: "Welcome, Student!"})
});

app.get('/sandbox', (req, res) => {
  res.render('countries', { title: "Languages spoken in countries", countries, languages })
});

app.listen(3000, () => {
  console.log('This site is running on localhost:3000');
});
