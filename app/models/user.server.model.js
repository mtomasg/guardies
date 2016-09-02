'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
	return (this.provider !== 'local' || (password && password.length > 6));
};

var userSchema = new Schema({
	username: { type: String, required: true, unique: true, trim: true, match: /^.+@igualada\.epiaedu\.cat$/ },
	firstName: { type: String, required: true },
	lastName: { type: String },
	displayName: { type: String, trim: true },
	stage: [{
		  type: String,
		  enum: ['eso_bat', 'inf_prim'],
		  required: true
		}
	],
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Password should be longer']
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {}/*,
	data: {
		oauth: { type: String, required: true }
	}*/
});

/**
 * Find possible not used username
 */
userSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({
		username: possibleUsername
	}, function(err, user) {
		if (!err) {
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

/**
 * Hook a pre save method to hash the password
 */
userSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
userSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create instance method for authenticating user
 */
userSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

var User = mongoose.model('User', userSchema);
module.exports = User;