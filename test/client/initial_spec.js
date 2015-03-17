'use strict';

var chai   = require('chai'),
    expect = chai.expect;

var app  = require('../../client/app'),
    data = require('../../client/people');

describe('require(whatever)', function () {

  it('works with Superman example', function () {
    expect(app.findSupermanIn(data.mrKentIsInThaHouse)).to.be.equal('Clark Kent');
    expect(app.findSupermanIn(data.mrKentHasLeftTheBuilding)).to.be.undefined;
  });

});

describe('require(jquery)', function () {

  it('loads jQuery', function () {
    expect(app.loadjQuery()).not.to.be.undefined;
  });

});

describe('require(baconjs)', function () {

  it('loads baconjs', function () {
    expect(app.baconjsToString()).to.be.equal('Bacon');
  });

});

describe('require(pointfree)', function () {

  it('loads pointfree-fantasy', function () {
    expect(app.loadPointfree().I('Blah')).to.be.deep.equal('Blah');
  });

});

