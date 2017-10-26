'use strict';

const API = require('services/api'),
	Sessions = require('libs/sessions');

//const debug = require('debug')('app:sessions');

async function run() {

	try {
		const theaters = await API.getTheaters();

		const sessions = await Promise.all( theaters.items.map(theater => API.getSessions(theater) ) );

		await Sessions.save( Sessions.parse(sessions) );

	} catch (err) {
		console.error('Error:sessions:run', err);
		//API.handleError('Error:sessions:run', err);
		return Promise.reject(err);
	}
}

module.exports = { run };