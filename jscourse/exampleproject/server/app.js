(function (require) {
  var express = require('express'),
    http = require('http'),
    sanitize = require('validator').sanitize,
    movies = require('./movies');

  var settings = {
    port: 4545,
    data: movies
  };

  /* *** Express ***
  *
  *  Request object
  *  --------------
  *   - params: GET/POST parameters
  *
  *  Response object
  *  ---------------
  *   - send (obj):
  *     serialize and deliver response
  *
  *   - writeHead (statusCode, obj):
  *     add headers to response
  */

  var app = express(),
    server;

  app
    .get('/', function (req, res) {
      res.send({
        movies: {
          rel: 'link',
          href: '/movies',
          description: 'The movie database'
        }
      });
    })
    .options('/', function (req, res) {
      res.send({ 'GET': 'List links' });
    });

  app
    .get('/movies', function (req, res) {
      res.send(movies);
    })
    .options('/movies', function (req, res) {
    res.send({
      'GET' : 'Lists all movies',
      'POST': 'Add new movie to collection'
    });
  });

  server = http.createServer(app);
  server.listen(settings.port);
  console.log('HTTP server running at http://0.0.0.0:' + settings.port);

})(require);
