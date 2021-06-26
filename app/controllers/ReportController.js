const httpStatus = require('http-status');
const ReportService = require('@services/ReportService');
const catchAsync = require('@app/utils/catchAsync');
const ApiError = require('@app/utils/ApiError');

const getReports = catchAsync(async (req, res) => {
	const Reports = await ReportService.getReports(req.query);
	res.send(Reports);
});

const getReport = catchAsync(async (req, res) => {
	const id = req.params.id;
	const report = await ReportService.getReport(id);

	if (!report) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
	}

	res.send(report);
});

const updateReport = catchAsync(async (req, res) => {
	const report = await ReportService.updateReport(req.params.id, req.body);
	res.send(report);
});

const deleteReport = catchAsync(async (req, res) => {
	await ReportService.deleteReport(req.params.id);
	res.send({ id: req.params.id });
});

module.exports = {
	getReports,
	getReport,
	updateReport,
	deleteReport,
};
