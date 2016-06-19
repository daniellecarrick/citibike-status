var request = require("request"); //importing request module
var db = require("./models"); 

var interval = 300000
getBikeData()
setInterval(getBikeData, interval)

function getBikeData(){
	console.log('still going')
	request("https://feeds.citibikenyc.com/stations/stations.json", function(error, response, body) {
		if (!error && response.statusCode == 200) //200 means success 
		{
			body = JSON.parse(body);
			body.stationBeanList.forEach(storeData)
		}
	})
}

function storeData (element, index, array) {
		var obj = {
			id: element.id,
			stationName: element.stationName,
			availableDocks: element.availableDocks,
			totalDocks: element.totalDocks,
			latitude: element.latitude,
			longitude: element.longitude,
			lastCommunicationTime: new Date(element.lastCommunicationTime)
		};

		var station = new db.Station(obj);
		station.save(function(err){
			if(err){
				console.error('problem saving station to db', err)
			}
		})
}