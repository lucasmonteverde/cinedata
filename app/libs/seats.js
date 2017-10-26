'use strict';

const _ = require('lodash'),
	API = require('services/api'),
	Session = require('mongoose').model('Session');

function parse(seats) {

	const available = ( seats.match(/Available/g) || [] ).length;
	const occupied = ( seats.match(/Occupied/g) || [] ).length;

	return {
		total: available + occupied,
		occupied: occupied
	};
}

async function update( session ) {
	
	try {
		const seats = await API.getSeats(session);

		const { total, occupied } = parse( seats );

		if ( ! occupied || ! total ) return;

		session.updates.push({
			occupied: occupied,
			date: Date.now()
		});

		session.seats = total;
		
		return session.save();
	} catch ( err ) {
		console.error('Error:seats:update', err);
		return Promise.reject(err);
	}
}

function save(sessions) {

	const bulkOps = _.map(sessions, session => ({
		updateOne: {
			filter: { _id: session._id },
			update: {
				$set: {
					seats: session.seats
				},
				$push: {
					updates: session.update
				}
			}
		}
	}));

	console.log(bulkOps);

	return Session.bulkWrite(bulkOps)
		.then( () => console.log('seats:save:done') )
		.catch( err => console.error('Error:seats:save', err) );
}

module.exports = { parse, save, update };