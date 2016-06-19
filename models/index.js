var mongoose = require("mongoose");

var opts = {
	server: {
		auto_reconnect: true,
		socketOptions: { keepAlive: 1, connectTimeoutMS: 45000}
	}
}

var db = mongoose.connection

db.on('connected', function() {
	console.log('Database connection initiated!');
});

db.on('reconnected', function () {
	console.log('MongoDB reconnected!');
});

db.on('error', function(e) {
	console.error('Database connection error: ', e);
	mongoose.disconnect();
});

db.on('disconnected', function() {
	console.warn('Database disconnected, attempt reconnect...');
	mongoose.connect('mongodb://localhost:27017/bikes', opts);
});

mongoose.connect('mongodb://localhost:27017/bikes', opts);

exports.Station = mongoose.model('Station', require('./stations'))