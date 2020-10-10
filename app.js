const express    = require('express');
const app        = express();
const port       = 3000;

const homeRoute  = require('./routes/home'); //import router
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const ejs        = require('ejs');

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connected successfully');
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use('/',homeRoute);

app.listen(port, () => {
	console.log(`This app is running on http://localhost:${port}`);
});