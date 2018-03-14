//converted to lambda on AWS
var Spotify = require('node-spotify-api');

module.exports.getPlaylist = (event, context, callback) => {
	console.log(event.body)
	let addedQuery = event.body

	var spotify = new Spotify({
	  id: '0627b9b3da1848fdbe4e7ee8a370f383',
	  secret: '865c085203704c16b59f02662dc5da22'
	});
	 

	spotify.search({ type: 'playlist', query: addedQuery, limit: 5 }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
		console.log(data.playlists.items[0].external_urls.spotify); 
	  const response = {
	    statusCode: 200,
	    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods" : "*"
      },
	    body: data.playlists.items[0].external_urls.spotify
	  };

	  callback(null, response);
	});
	

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};