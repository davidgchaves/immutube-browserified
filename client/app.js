var R = require('ramda');
var $ = require('jquery');
var B = require('baconjs');
var P = require('pointfree-fantasy');

var isSuperman    = function(name) { return (name === 'Clark Kent'); };
var isSupermanLog = function(name) {
  isSuperman(name) ? console.log('Oh! Hi, Superman!') : console.log('No, you are not Superman!');
};
var loadjQuery = function () {
  console.log($);
  return $;
};
var loadBaconjs = function () {
  console.log(B);
  return B;
};
var baconjsToString = function () {
  return B.toString();
};
var loadPointfree = function () {
  console.log(P);
  return P;
};


var findSupermanIn    = R.find(isSuperman);
var findSupermanInLog = R.map(isSupermanLog);

exports.findSupermanIn    = findSupermanIn;
exports.findSupermanInLog = findSupermanInLog;
exports.loadjQuery        = loadjQuery;
exports.loadBaconjs       = loadBaconjs;
exports.baconjsToString   = baconjsToString;
exports.loadPointfree     = loadPointfree;

