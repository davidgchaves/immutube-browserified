'use strict';

var $ = require('jquery'),
    R = require('ramda'),
    P = require('pointfree-fantasy'),
    B = require('baconjs'),
    io = require('./io');

io.extendFn();

/*
 * HELPERS
 */

var compose = P.compose;
var map     = P.map;
var log     = function(x) { console.log(x); return x; };
var fork    = R.curry(function(error, success, task) { return task.fork(error, success); });
var setHtml = R.curry(function(sel, x) { return $(sel).html(x); });

// Helper to curry and switch args order when calling Bacon's fromEvent function
// We need it because we know the eventName (keyup) and want to curry waiting for the target
var eventToStream = R.curry(function(eventName, target) { return B.fromEvent(target, eventName); });

/*
 * PURE
 */

//  domSelectorToIO :: Selector -> IO DOM
var domSelectorToIO = $.toIO();

//  keyUpEventToStream :: DOM -> EventStream DOMEvent
var keyUpEventToStream = eventToStream('keyup');

/*
 * IMPURE
 */

