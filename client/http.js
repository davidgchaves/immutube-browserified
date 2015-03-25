'use strict';

var $    = require('jquery'),
    Task = require('data.task');

var getJSON = function(url) {
  return new Task(function(rej, res) {
    $.getJSON(url, res);
  });
};

exports.getJSON = getJSON;

