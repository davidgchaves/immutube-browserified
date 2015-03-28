'use strict';

var chai   = require('chai'),
    expect = chai.expect;

var pure   = require('../../client/app.js');

describe('lastElementIn(array) helper', function() {
  it('returns the last element in the given array', function() {
    expect(pure.lastElementIn([1,2,3,4,5])).to.be.equal(5);
  });
});

