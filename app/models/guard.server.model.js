'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var guardSchema = new Schema({
	teacher: { type: String, required: true, match: /^.+@igualada\.epiaedu\.cat$/ },
	dayOfWeek: { type: Number, required: true, min: 1, max: 5 },
	stage: {
	  type: String,
	  enum: ['eso_bat', 'inf_prim'],
	  required: true
	},
	timeSlot: { type: String, required: true },
	tutoring: { type: Boolean }
});


var Guard = mongoose.model('Guard', guardSchema);
module.exports = Guard;
