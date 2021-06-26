const mongoose = require('mongoose');
const { paginate, toJSON } = require('./plugins');
const { v4: uuidv4 } = require('uuid');

const referenceSchema = new mongoose.Schema({
	referenceId: {
		type: String,
		required: true,
	},
	referenceType: {
		type: String,
		required: true,
		trim: true,
		default: 'REPORT',
	},
});

const payloadSchema = new mongoose.Schema({
	source: {
		type: String,
		trim: true,
		required: true,
		default: 'REPORT',
	},
	reportType: {
		type: String,
		trim: true,
		required: true,
		enum: ['SPAM', 'INFRINGES_PROPERTY', 'VIOLATES_POLICIES'],
	},
	message: {
		type: String,
		trim: true,
		default: null,
	},
	reportId: {
		type: String,
		required: true,
	},
	referenceResourceId: {
		type: String,
		required: true,
	},
	referenceResourceType: {
		type: String,
		required: true,
		trim: true,
		enum: ['POST', 'ARTICLE', 'REPLY'],
	},
});

const ReportSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4,
	},
	state: {
		type: String,
		required: true,
		trim: true,
		enum: ['OPEN', 'BLOCKED', 'RESOLVED'],
		default: 'OPEN',
	},
	source: {
		type: String,
		required: true,
		trim: true,
		default: 'REPORT',
	},
	sourceIdentityId: {
		type: String,
		required: true,
	},
	reference: {
		type: referenceSchema,
		required: true,
		default: {},
	},
	payload: {
		type: payloadSchema,
		required: true,
		default: {},
	},
	id: {
		type: String,
		default: function() {
			return this._id;
		},
	},
}, {
	timestamps: true,
});

ReportSchema.plugin(paginate);
ReportSchema.plugin(toJSON);

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
