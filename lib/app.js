var R = require('ramda');

var isSuperman    = function(name) { return (name === 'Clark Kent'); };
var isSupermanLog = function(name) {
  isSuperman(name) ? console.log("Oh! Hi, Superman!") : console.log("No, you are not Superman!");
};

var findSupermanIn    = R.find(isSuperman);
var findSupermanInLog = R.map(isSupermanLog);

exports.findSupermanIn    = findSupermanIn;
exports.findSupermanInLog = findSupermanInLog;

