const express = require('express');
const router = express.Router();

const { reportValidation, deviceValidation } = require('@app/validations');
const reportController = require('@app/controllers/ReportController');

router.route('/')
	.get(reportValidation.getReports, reportController.getReports);

router.route('/:id')
	.get(reportController.getReport)
	.put(reportValidation.updateReport, reportController.updateReport)
	.delete(reportController.deleteReport);

module.exports = router;
