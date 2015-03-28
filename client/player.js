'use strict';

var create = function(youtubeId) {
  return '<iframe width="320" height="240" src="//www.youtube.com/embed/' + youtubeId + '" frameborder="0" allowfullscreen></iframe>';
};

exports.create = create;

