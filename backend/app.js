require('dotenv').config();
// middleware and logger.
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { seedAssignment } = require('./seeder/seedAssignment.js')

// connection related.
const cors = require('cors');
const http = require('http');

// related files.
const config = require('./config/Config.js');
const routes = require('./routes/Routes.js');

const app = express();

mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
  }).then(async () => {
    console.log("Connected MongoDB");

    await seedAssignment();
  });
app.use(cors());  //enable cors

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/assignment', routes);

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

// prevent server shutdown after one api calls.
const server = http.createServer(app);
server.keepAliveTimeout = 30000;
server.headerTimeout = 35000;

server.listen(config.APP_PORT, () => {
	console.log(`Server running on port ${config.APP_PORT}`);
});

module.exports = app;
