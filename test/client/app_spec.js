'use strict';

var chai   = require('chai'),
    expect = chai.expect;

var pure   = require('../../client/pure.js'),
    Maybe  = require('../../client/maybe.js');

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

describe('getDataFrom(youtubeid) helper', function() {
  it('retrieves the data-youtubeid property of the given <li>', function() {
    var youtubeidProperty = "http://gdata.youtube.com/feeds/api/videos/PBZsj8FPSbo";
    var listItem          = "<li data-youtubeid=" + youtubeidProperty + ">Best sequence shot ever - Tarkovsky</li>";
    expect(pure.getDataFrom('youtubeid')(listItem)).to.be.equal(youtubeidProperty);
  });
});

describe('maybeYoutubeLink(listItem)', function() {
  it('retrieves and packs the youtube video id from the given <li> in a Maybe', function() {
    var youtubeId = "PBZsj8FPSbo";
    var listItem  = "<li data-youtubeid='http://gdata.youtube.com/feeds/api/videos/" + youtubeId + "'>Best sequence shot ever - Tarkovsky</li>";
    expect(pure.maybeYoutubeId(listItem)).to.be.deep.equal(Maybe(youtubeId));
  });
});

