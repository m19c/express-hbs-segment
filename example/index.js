var express = require('express');
var expressHandlebars = require('express-hbs');
var liveReload = require('connect-livereload');
var segment = require('../');
var app = express();

app.use(liveReload());

segment.configure({
  handlebars: expressHandlebars,
  directories: [__dirname + '/segment']
});

app.engine('hbs', expressHandlebars.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname);

app.get('/', function main(req, res) {
  res.render('index.hbs');
});

app.listen(1337);
