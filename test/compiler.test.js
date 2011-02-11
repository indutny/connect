
/**
 * Module dependencies.
 */

var connect = require('connect')
  , assert = require('assert')
  , should = require('should')
  , http = require('http');

module.exports = {
  test: function(){
    var app = connect.createServer(
      connect.compiler({
          src: __dirname + '/fixtures'
        , enable: ['sass', 'coffeescript']
      }),
      connect.static({ root: __dirname + '/fixtures' })
    );

    assert.response(app,
      { url: '/doesnotexist.css' },
      { status: 404 });

    assert.response(app,
      { url: '/style.css' },
      { body: 'body {\n  font-size: 12px;\n  color: #000;}\n' });

    assert.response(app,
      { url: '/style.css' },
      { body: 'body {\n  font-size: 12px;\n  color: #000;}\n' });

    assert.response(app,
      { url: '/foo.bar.baz.css' },
      { body: 'foo {\n  color: #000;}\n' });

    assert.response(app,
      { url: '/script.js' },
      { body: /^\(function\(\)/ });
  },

  'test .compilers': function(){
    connect.compiler.compilers.should.be.a('object');
  }
};
