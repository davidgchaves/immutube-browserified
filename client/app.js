var R = require('ramda');
var $ = require('jquery');

var isSuperman    = function(name) { return (name === 'Clark Kent'); };
var isSupermanLog = function(name) {
  isSuperman(name) ? console.log('Oh! Hi, Superman!') : console.log('No, you are not Superman!');
};
var loadjQuery = function () {
  console.log($);
  return $;
};

var findSupermanIn    = R.find(isSuperman);
var findSupermanInLog = R.map(isSupermanLog);

exports.findSupermanIn    = findSupermanIn;
exports.findSupermanInLog = findSupermanInLog;
exports.loadjQuery        = loadjQuery;

