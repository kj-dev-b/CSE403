var assert = require('assert');
var processor = require('../src/text-processor');

describe('text-processor', function() {

  describe('#extractCommand', function() {
    it('should find comment at start of string', function() {
    	var rawInput="comment \"best code i've ever seen :)\"";
    	var expected="comment";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should find inline comment at start of string on green diff', function() {
    	var rawInput="comment123+ \"best code i've ever seen :)\"";
    	var expected="comment123+";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should find inline comment at start of string on red diff', function() {
    	var rawInput="comment123- \"best code i've ever seen :)\"";
    	var expected="comment123-";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should find request changes at start of string', function() {
    	var rawInput="request changes \"best code i've ever seen :)\"";
    	var expected="request changes";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should find approve at start of string', function() {
    	var rawInput="approve \"best code i've ever seen :)\"";
    	var expected="approve";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should not recognize no command in string', function() {
    	var rawInput="\"best code i've ever seen :)\"";
    	var expected="unrecognized";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should not find command in middle or end of string', function() {
    	var rawInput="please don't make a comment";
    	var expected="unrecognized";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should not find inline comment unproperly formatted', function() {
    	var rawInput="commentblahblahblah- \"best code i've ever seen :)\"";
    	var expected="unrecognized";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should find command in any caps with spaces', function() {
    	var rawInput="     CoMMenT    \"best code i've ever seen :)\"";
    	var expected="comment";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });
  });


  describe('#extractMessage', function() {
    it('should find best code i\'ve ever seen :)', function() {
    	var rawInput="comment \"best code i've ever seen :)\"";
    	var expected="best code i've ever seen :)";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should find best code i\'ve ever seen :)', function() {
    	var rawInput="comment123+ \"best code i've ever seen :)\"";
    	var expected="best code i've ever seen :)";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should find best code i\'ve ever seen :)', function() {
    	var rawInput="comment123- \"best code i've ever seen :)\"";
    	var expected="best code i've ever seen :)";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should find best code i\'ve ever seen :)', function() {
    	var rawInput="request changes \"best code i've ever seen :)\"";
    	var expected="best code i\'ve ever seen :)";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should find best code i\'ve ever seen :)', function() {
    	var rawInput="approve \"best code i've ever seen :)\"";
    	var expected="best code i've ever seen :)";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should not recognize command and return empty string', function() {
    	var rawInput="\"best code i've ever seen :)\"";
    	var expected="";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should not recognize command and return empty string', function() {
    	var rawInput="please don't make a comment";
    	var expected="";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should not recognize command and return empty string', function() {
    	var rawInput="commentblahblahblah- \"best code i've ever seen :)\"";
    	var expected="";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
    });

    it('should find command in any caps with spaces', function() {
    	var rawInput="     CoMMenT    \"best code i've ever seen :)\"";
    	var expected="";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
	});
	
	it('should best code i\'ve ever seen :)', function() {
    	var rawInput="     CoMMenT    best code i've ever seen :)";
    	var expected="";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
	});

	it('should best code i\'ve ever seen :)', function() {
    	var rawInput="     CoMMenT    'best code i've ever seen :)'";
    	var expected="";
    	var actual=processor.extractCommand(rawInput);

     	assert.equal(expected, actual);
	});
	
  });

});