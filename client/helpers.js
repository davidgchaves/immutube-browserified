'use strict';

var $ = require('jquery'),
    R = require('ramda'),
    P = require('pointfree-fantasy'),
    B = require('baconjs');

var compose = P.compose;
var map     = P.map;
var log     = function(x) { console.log(x); return x; };
var fork    = R.curry(function(error, success, task) { return task.fork(error, success); });
var setHtml = R.curry(function(sel, x) { return $(sel).html(x); });

// Helper to curry and switch args order when calling Bacon's fromEvent function
// We need it because we know the eventName (keyup) and want to curry waiting for the target
var eventToStream = R.curry(function(eventName, target) { return B.fromEvent(target, eventName); });

// Helper to get the last element in an Array
var lastElementIn = function(array) { return array[array.length - 1]; };

// Helper to curry and switch args order using jQuery data function
// We need it because we know the propertyName (youtubeid) and want to curry waiting for the DOMElement
var getDataFrom = R.curry(function(name,elt) { return $(elt).data(name); });

exports.compose       = compose;
exports.map           = map;
exports.log           = log;
exports.fork          = fork;
exports.setHtml       = setHtml;
exports.eventToStream = eventToStream;
exports.lastElementIn = lastElementIn;
exports.getDataFrom   = getDataFrom;

