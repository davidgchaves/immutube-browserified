'use strict';

var chai   = require('chai'),
    expect = chai.expect;

var app  = require('../lib/app'),
    data = require('../lib/people');

describe('require(whatever)', function () {

  it('works with Superman example', function () {
    expect(app.findSupermanIn(data.mrKentIsInThaHouse)).to.be.equal('Clark Kent');
    expect(app.findSupermanIn(data.mrKentHasLeftTheBuilding)).to.be.undefined;
  });

});

