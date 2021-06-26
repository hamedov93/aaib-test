require('module-alias/register');
require('dotenv').config();

const app = require('@app');
const config = require('@root/config');
const mongoose = require('mongoose');

const { insertReports } = require('../tests/fixtures/report.fixture');

mongoose.connect(config.mongo.url, config.mongo.options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  	insertReports().then(() => {
  		console.log('Reports seeded successfully');
  	}).catch(err => {
  		console.log(err);
  	}).finally(() => {
  		process.exit();
  	});
});
