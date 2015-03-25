'use strict';

var $ = require('jquery'),
    R = require('ramda'),
    P = require('pointfree-fantasy'),
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

/*
 * PURE
 */

//  domSelectorToIO :: Selector -> IO DOM
var domSelectorToIO = $.toIO();

/*
 * IMPURE
 */

