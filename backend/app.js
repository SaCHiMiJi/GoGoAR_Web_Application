const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const config = require('./config/Config.js');
const routes = require('./routes/Routes.js');

const app = express();

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// CORS Configuration
const corsOptions = {
	origin: 'http://localhost:3030',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	credentials: true
};

app.use(cors(corsOptions));  //enable cors

app.options('*', cors());

// enable cors for the POST method.
/*
 
app.options('/assignment/create', cors({
	methods: ['POST'],
	enablePreflight: true
}));
app.post('/assignment/create', cors({
	methods: ['POST'],
	enablePreflight: true
}));
*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/assignment', routes);

console.log("application is restarted.")

// Error handling and logging middleware
app.use((req, res, next) => {
    console.log(`FullRequest URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    // Instead of creating a 404 error here, just pass control to the next middleware
    next();
}); 

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.APP_PORT); // Listen on port defined in environment

module.exports = app;
