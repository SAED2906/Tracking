function wait(ms) {
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
		end = new Date().getTime();
	}
}

run();

function run() {
	var icloud = require("find-my-iphone").findmyphone;
	var fs = require('fs');
	icloud.apple_id = "";
	icloud.password = "";
	var device;
	icloud.getDevices(function (error, devices) {
		console.log(error);

		if (error) {
			throw error;
		}

		devices.forEach(function (d) {
			console.log(d.location);
			if (device == undefined && d.location && d.lostModeCapable) {
				device = d;


			}
		});

		if (device) {


			icloud.getLocationOfDevice(device, function (err, location) {
				var json = device.location;
				console.log(json.latitude);
				console.log(json.longitude);
				fs.appendFile('out.csv', json.latitude + "," + json.longitude + "," + json.timeStamp + "\n", function (err) {
					if (err) throw err;
					console.log('Saved!');
				});

			});
		}
	});
}
