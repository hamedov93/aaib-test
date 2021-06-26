const mongoose = require('mongoose');
const faker = require('faker');
const { Report } = require('@models');
let reports = require('./reports');

const insertReports = async () => {
  reports = {
    ...reports,
    elements: reports.elements.map(report => ({
      ...report,
      createdAt: new Date(report.created),
      _id: report.id, 
    })),
  };

  await Report.insertMany(reports.elements);
};

module.exports = {
  insertReports,
};
