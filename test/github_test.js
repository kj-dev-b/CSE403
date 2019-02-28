var assert = require('assert');
var github = require('../src/github');

describe('github', function() {

  describe('#message', function() {
    it('respond with message from github', function() {
    	var payload={}
    	var actual=github.message(payload);
     	assert.equal('Hello from GitHub!', actual);
    });
  });

});