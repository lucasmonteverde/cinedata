'use strict';

const Seats = require('libs/seats'),
	Session = require('mongoose').model('Session');

function run() {
	return Session
		.find({
			date: { $gt: Date.now() }
		})
		.select('_id sector updates')
		.then( sessions => sessions )
		.each( Seats.update )
		.then( () => console.log('seats:run:done') )
		.catch( err => console.error('Error:sessions:run', err) );
}

module.exports = { run };