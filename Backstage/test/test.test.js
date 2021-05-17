'use strict'
require('should');
const exp = require('../index.js');

describe('test', function () {
  it('should get "07"', function () {
    exp().should.be.eql('07');
  })
});