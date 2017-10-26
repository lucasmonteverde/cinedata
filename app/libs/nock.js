'use strict';

const nock = require('nock');

nock('https://api-content.ingresso.com/v0')
	.persist()
	.filteringPath( /theaters\/city\/(.*)/g, 'theaters/city/' )
	.get('/theaters/city/')
	.reply(200, require('data/theaters.json') )

nock('https://api-content.ingresso.com/v0')
	.persist()
	.filteringPath( /sessions\/city\/(.*)/g, 'sessions/city/' )
	.get('/sessions/city/')
	.reply(200, require('data/sessions.json') );

nock('https://api.ingresso.com/v1')
	.persist()
	.filteringPath( /sessions\/(.*)/g, 'sessions/' )
	.get('/sessions/')
	.reply(200, require('data/seats.json') );