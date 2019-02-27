var assert = require('assert');
var bot = require('../src/slackbot');

describe('slackbot', function() {

  describe('#respond', function() {
    it('should say hello to the given user', function() {
    	var payload={'user_name':'pikachu'}
    	var actual=bot.respond(payload);
     	assert.equal('Hello, pikachu!', actual);
    });
  });

});