'use strict';

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	_id: Number,
	sector: Number,
	theater: Number,
	movie: Number,
	city: Number,
	type: {
		type: String,
		enum: ['2D','3D','4D']
	},
	language: {
		type: String,
		enum: ['NAC','DUB','LEG']
	},
	date: Date,
	seats: Number,
	updates: [{
		_id: false,
		select: false,
		date: Date,
		occupied: Number
	}]
}, {
	collection: 'sessions',
	_id: false,
	versionKey: false,
	autoIndex: false,
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

module.exports = mongoose.model('Session', Schema);