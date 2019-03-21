var assert = require('assert');
var bot = require('../src/slackbot');

describe('slackbot', function() {

  describe('#comment', function() {
    it('should return successful comment for correct request', function() {
      var command = "comment"
      var message = "hello world"
      var payload = {
        'user_name': 'pikachu'
      };
      var actual = bot.comment(command, message, payload);
      var expected = {
        "response_type": "in_channel",
        "text": `<@pikachu> made a comment: "hello world"`
      }
      assert.equal(expected.text, actual.text);
      assert.equal(expected.response_type, actual.response_type);
    });
  });

  describe('#request changes', function() {
    it('should return successful request changes for correct request', function() {
      var command = "request changes"
      var message = "hello world"
      var payload = {
        'user_name': 'pikachu'
      };
      var actual = bot.requestChanges(command, message, payload);
      var expected = {
        "text": `request changes on pull request :exploding_head:`,
        "attachments": [{
          "text": `hello world, by <@pikachu>`
        }]
      }
      assert.equal(expected.text, actual.text);
      assert.deepEqual(expected.attachments, actual.attachments);
    });
  });

  describe('#approve', function() {
    it('should return successful approve for correct request', function() {
      var command = "approve"
      var message = "hello world"
      var payload = {
        'user_name': 'pikachu'
      };
      var actual = bot.approve(command, message, payload);
      var expected = {
        "text": `pull request approved :rocket:`,
        "attachments": [{
          "text": `hello world, by <@pikachu>`
        }]
      }
      assert.equal(expected.text, actual.text);
      assert.deepEqual(expected.attachments, actual.attachments);
    });
  });

  describe('#unrecognized', function() {
    it('should return help prompt for unrecognized request', function() {
      var actual = bot.unrecognized();
      var expected = "Command not recognized, try saying `help`!"
      assert.equal(expected, actual);
    });
  });

  describe('#newPR', function() {
    it('should make a post request 4 times', function() {
      postRequest = async function(url, param) {
        return {
          group: {
            id: '1234',
            name: 'qreview'
          }
        }
      };
      var actual = bot.newPR('', '', '123', '123', '111', postRequest);
    });
  })

});