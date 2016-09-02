'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	guardApi = require('./models.server.routes.tests.api')(app, 'Guard','/guards/'),
	User = require('../models/user.server.model'),
	Guard = require('../models/guard.server.model'),
	chalk = require('chalk');

/**
 * Unit tests
 */
describe('Guard API', function() {
	var user = new User({
			username: "albert.piernas@igualada.epiaedu.cat",
			firstName: "Albert",
			lastName: "Piernas",
			provider: "local",
			password: "password"
		  });
		  
	before(function(done) {
		user.save(done);
	});

	after(function(done) {
		User.remove().exec();
		done();
	});

	describe('create first guard', function() {
		var guard = {
			teacher: user.username,
			dayOfWeek: 1,
			stage: 'eso_bat',
			timeSlot: '0900',
			tutoring: false
		};

		describe('valid guard', function(done) {

			var response = {};

			before(function(done) {
				// TODO: Check duplicates
				guardApi.create(guard, function(guardRes) {
					guard = guardRes.body;
					response = guardRes;
					done();
				});
			});

			it('returns success status', function() {
				response.statusCode.should.equal(201);
			});

			it('returns product details including new id', function() {
				response.body.should.have.property('_id');
			});

			it('is saved in database', function(done) {	
				guardApi.get(response.body._id, function(res) {
					res.statusCode.should.equal(200);
					response.body.should.have.property('_id', response.body._id);
					for (var property in guard) {
						response.body.should.have.property(property, guard[property]);
					}
					done();
				});
			});

			after(function(done) {
				guardApi.clear(done);
			});
		});

	});
});
