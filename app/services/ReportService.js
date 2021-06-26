const httpStatus = require('http-status');
const Report = require('@models/Report');
const ApiError = require('@app/utils/ApiError');

class ReportService {

	async updateReport(reportId, data) {

		const report = await Report.findById(reportId);
		
		if (!report) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
		}

		Object.assign(report, data);

		await report.save();

		return report;
	}

	async getReports(params) {
		const filter = params.filter || {};

		return await Report.paginate(filter, {
			limit: params.limit || 10,
			page: params.page || 1,
			sortBy: params.sortBy || 'createdAt:desc',
		});
	}

	async getReport(reportId) {
		return await Report.findById(reportId);
	}

	async deleteReport(reportId) {
		const report = await Report.findById(reportId);
		
		if (!report) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
		}

		await report.remove();

		return report;
	}
}

module.exports = new ReportService();