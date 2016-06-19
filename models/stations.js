var mongoose = require("mongoose");
var schema = mongoose.Schema;

var Station = new schema({
	id: Number || -1,
	stationName: String || null,
	availableDocks: Number || null,
	totalDocks: Number || null,
	latitude: Number || null,
	longitude: Number || null,
	lastCommunicationTime: Date || null
});

module.exports = Station;

