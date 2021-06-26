
module.exports = {
	env: process.env.NODE_ENV,
	mongo: {
		url: 'mongodb://mongo:27017/reports' + (process.env.NODE_ENV === 'test' ? '-test' : ''),
	    options: {
	      useCreateIndex: true,
	      useNewUrlParser: true,
	      useUnifiedTopology: true,
	    },
	},
};
