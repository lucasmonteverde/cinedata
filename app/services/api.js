'use strict';

const axios = require('axios'),
	pad = require('lodash').padStart;

axios.defaults.baseURL = 'https://api-content.ingresso.com/v0/';

function handleError(key, err) {
	if (err.response) {
		console.error(key + ':response', err.response.status, err.response.data && ( err.response.data.Message || err.response.data.message ) || err.response.data );
	} else if (err.request) {
		console.error(key + ':request', err.request);
	} else {
		console.error(key + ':default', err.message);
	}
	//console.error(key + ':config', error.config);
}

module.exports = {

	handleError: handleError,

	getTheaters(city = 1) {
		return axios.get(`theaters/city/${city}/partnership/${process.env.PARTNERSHIP}`)
			.then( res => res.data );
	},

	getSessions(theater) {
		return axios.get(`sessions/city/${theater.cityId}/theater/${theater.id}/partnership/${process.env.PARTNERSHIP}`)
			.then( res => res.data );
	},

	getSeats(session) {
		return axios.get(`https://api.ingresso.com/v1/sessions/${session._id}/sections/${pad(session.sector,8,'0')}/seats`, {
			transformResponse: req => req
		})
		.then( res => res.data );
	}

};