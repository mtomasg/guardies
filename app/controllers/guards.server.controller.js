'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	_ = require('lodash');
	

var crud = require('./crud.server.controller')('Guard', 'teacher');

module.exports = crud;
	
	/*,Guard = mongoose.model('Guard');
	
module.exports = {
	create: function(req, res) {
		var guard = new Guard(req.body);
		guard.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
			else {
				//console.log("Guardia: " + guard);
				res.status(201).json(guard);
			}
		});
	},
	read: function(req, res) {
		res.json('Guard');
	}
};
*/