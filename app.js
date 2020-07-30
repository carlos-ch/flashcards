const express = require('express');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

/**
 * next 2 lines instead of body-parser
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());


app.set('view engine', 'pug');




/**
 * Error test

 app.use((req, res, next) => {
   req.messagy = "This is a message";
   console.log("Hello");
   const err = new Error("Oh, no!!!");
   err.status = 500;
   next(err);
 });

 app.use((req, res, next) => {
   console.log(req.messagy);
   console.log("World");
   next();
 });

 */


const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');


app.use(mainRoutes);
app.use('/cards', cardRoutes)



app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});


app.listen(3000, () => {
  console.log('This site is running on localhost:3000');
});
