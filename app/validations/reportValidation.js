const httpStatus = require('http-status');
const ApiError = require('@app/utils/ApiError');

const updateReport = (req, res, next) => {
	const { state } = req.body;
	let message;

	if (!state) {
		message = 'Report state field is required';
	}

	if (message) {
		return next(new ApiError(httpStatus.BAD_REQUEST, message));
	}

	return next();
};

const getReports = (req, res, next) => {
	const params = req.query;
	const allowedParams = ['page', 'limit', 'sortBy', 'filter'];

	let message;

	for (var key in params) {
		if (allowedParams.indexOf(key) === -1) {
			message = `${key} param is not allowed`;
		}
	}

	// We need to apply more validation to filters and pagination params

	if (message) {
		return next(new ApiError(httpStatus.BAD_REQUEST, message));
	}

	return next();
};

module.exports = {
	updateReport,
	getReports,
};
