const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('@app');
const setupTestDB = require('../utils/setupTestDB');
const { Report } = require('@models');
const { insertReports } = require('../fixtures/report.fixture');

setupTestDB();

describe('Report routes', () => {

  beforeEach(async () => {
    await insertReports();
  });

  test('should return 200 and successfully block report content if data is ok', async () => {
    const report = await Report.findOne({ state: 'OPEN' });

    const res = await request(app)
      .put('/api/reports/' + report._id)
      .send({
      	state: 'BLOCKED',
      })
      .expect(httpStatus.OK);

    expect(res.body.state).toEqual('BLOCKED');

    const dbReport = await Report.findById(report._id);
    expect(dbReport.state).toEqual('BLOCKED');
  });

  test('should return 200 and successfully fetch report details if data is ok', async () => {
    let report = await Report.findOne({});
    const res = await request(app)
      .get('/api/reports/' + report._id)
      .send()
      .expect(httpStatus.OK);

    delete res.body.payload._id;
    delete res.body.reference._id;
    report = report.toJSON();
    delete report.payload._id;
    delete report.reference._id;

    expect(report).toMatchObject(res.body);
  });

  test('should return 200 and successfully delete report', async () => {
  	const report = await Report.findOne({});

    const res = await request(app)
      .delete('/api/reports/' + report._id)
      .send()
      .expect(httpStatus.OK);

    const dbReport = await Report.findById(report._id);
    	expect(dbReport).toEqual(null);
  });

  test('should return 200 and successfully fetch report list', async () => {

    const reportsCount = await Report.countDocuments();

  	const res = await request(app)
    	.get('/api/reports')
    	.send()
    	.expect(httpStatus.OK);

   	// We could apply more checks
    expect(res.body.total).toEqual(reportsCount);
  });
});
