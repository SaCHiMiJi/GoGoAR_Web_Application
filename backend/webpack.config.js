const path = require('path');

module.exports = {
  mode: 'production', // or 'production'
  entry: './app.js', // Adjust this path to where your actual entry file is located
  output: {
     path: path.resolve(__dirname, 'dist'),
     filename: 'bundle.js'
  }
};
