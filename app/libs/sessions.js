'use strict';

const _ = require('lodash'),
	Session = require('mongoose').model('Session');

function parse(sessions) {

	/*
	sessions = sessions[0];

	 _.each(sessions, session => {

		_.each(session.movies, movie => {

			_.each(movie.rooms, room => {

				_.each(room.sessions, session => {

					data.push({
						id: +session.id,
						sector: session.defaultSector,
						type: _.get(session.types, '0.alias'),
						language: _.get(session.types, '1.alias'),
						date: new Date(session.date.localDate)
					});
				});

			});

		});

	}); */

	return _(sessions)
		.flatMap()
		.flatMapDeep('movies')
		.flatMapDeep('rooms')
		.flatMapDeep('sessions')
		.filter(Boolean)
		.map( session => ({
			_id: session.id,
			sector: session.defaultSector,
			type: _.get(session.types, '0.alias'),
			language: _.get(session.types, '1.alias'),
			date: new Date(session.date.localDate)
		}))
		.value();
}

function save(sessions) {

	const bulkOps = _.map(sessions, session => ({
		updateOne: {
			filter: { _id: session._id },
			update: session,
			upsert: true
		}
	}));

	console.log(bulkOps);

	return Session.bulkWrite(bulkOps)
		.then( () => console.log('session:save:done') )
		.catch( err => console.error('Error:session:save', err) );
}

module.exports = { parse, save };