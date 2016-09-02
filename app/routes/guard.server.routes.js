'use strict';

module.exports = function(app) {
	var guards = require('../controllers/guards.server.controller');
	var users = require('../controllers/users.server.controller');
	var apiAuth = require('../controllers/api.authorization.server.controller');
	
	app.route('/guards')
		.get(apiAuth, users.requiresLogin, guards.list)
		.post(apiAuth, users.requiresLogin, guards.create);

	app.route('/guards/:guardId')
		.get(apiAuth, users.requiresLogin, guards.read)
		.delete(apiAuth,  users.requiresLogin, guards.delete);
		// .put(apiAuth, users.requiresLogin, guards.update)

	// Finish by binding the article middleware
	app.param('guardId', guards.getByID);
};
