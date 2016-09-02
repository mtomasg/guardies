'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var medicalLeaveSchema = new Schema({
	teacher: { type: String, required: true, match: /^.+@igualada\.epiaedu\.cat$/ },
	startDateTime: { type: Date, required: true },
	endDateTime: { type: Date, required: true }
});

var MedicalLeave = mongoose.model('MedicalLeave', medicalLeaveSchema);
module.exports = MedicalLeave;
