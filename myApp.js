const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config()

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
          console.log('Database connection successful')
        })
        .catch(err => {
          console.error('Database connection error')
        });

const Person = require('./models/Person');
const person = new Person({name:'name', age: 18, favoriteFoods: ['test']});
//person.save().then(res => console.log(res));
/*
te = [
  {name:'name 18', age: 18, favoriteFoods: ['test']},
  {name:'name 19', age: 19, favoriteFoods: ['test']}
];

Person.create(te);

Person.find().then(res => console.log(res));

Person.findOne({age: 19})
      .then(res => console.log(res));

Person.updateOne({_id:'5e9741b0209b5742443910b1'}, {favoriteFoods: ['test']})
      .then(res => console.log(res));

      
Person.findByIdAndUpdate({_id:'5e9741b0209b5742443910b1'}, {favoriteFoods: ['findone']})
      .then(res => console.log(res));

Person.findById('5e9741b0209b5742443910b1')
      .then(res => console.log(res));
*/
Person.find().then(res => console.log(res.length));
Person.findByIdAndRemove('5e974348b67a593e70e3ca0c').exec();
Person.find().then(res => console.log(res.length));
// --> 7)  Mount the Logger middleware here
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + '-' + req.ip);
  next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");
/** 2) A first working Express Server */
app.get('/hello', (req, res) => {
  res.send('Hello Express');
});

/** 3) Serve an HTML file */
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/views/index.html');
});

/** 4) Serve static assets  */
app.use(express.static(__dirname+'/public'));

/** 5) serve JSON on a specific route */
app.get('/json', (req, res) => {
  res.json({'message':'Hello json'});
});

/** 6) Use the .env file to configure the app */
app.get('/json-uppercase', (req, res) => {
  if(process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({'message':'HELLO JSON'});
  } else {
    res.json({'message':'Hello json'});
  }
});
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next()
}, (req, res) => {
  res.json({time: req.time});
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word});
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get('/name', (req, res) => {
  res.json({name: req.query.first + ' ' + req.query.last});
});
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */

app.post('/name', (req, res) => {
  res.json({name: req.body.first + ' ' + req.body.last});
});

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */
app.listen(process.env.PORT || 3000);
//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
