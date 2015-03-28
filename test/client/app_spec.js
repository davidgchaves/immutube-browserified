'use strict';

var chai   = require('chai'),
    expect = chai.expect;

var pure   = require('../../client/app.js');

describe('lastElementIn(array) helper', function() {
  it('returns the last element in the given array', function() {
    expect(pure.lastElementIn([1,2,3,4,5])).to.be.equal(5);
  });
});

describe('youtubeURLToYoutubeId(url)', function() {
  it('retrieves the youtube video id from a given youtube related URL', function() {
    var youtubeFeedURL = "http://gdata.youtube.com/feeds/api/videos/";
    var youtubeId      = "PBZsj8FPSbo";
    var url            = youtubeFeedURL + youtubeId;
    expect(pure.youtubeURLToYoutubeId(url)).to.be.equal(youtubeId);
  });
});

