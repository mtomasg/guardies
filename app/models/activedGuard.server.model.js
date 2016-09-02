'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var activedGuardSchema = new Schema({
  done: { type: Boolean },
  guard: { type: Schema.Types.ObjectId, ref: 'Guard' }
});

var ActivedGuard = mongoose.model('ActivedGuard', activedGuardSchema);
module.exports = ActivedGuard;