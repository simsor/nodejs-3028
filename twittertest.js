var http = require("http");
var port = process.env.PORT || 1337;
var Twitter = require("twitter");

var client = new Twitter({
    consumer_key: "qkFJwu2Pw6as6DF4bfLiWpURe",
    consumer_secret: "xQgt9haBKKAklCtZ1QXKHDTJH6B2EucyiUEQ9naiscsy4XUH56",
    access_token_key: "3297734163-nz4AqIGKnGjTGy3lbidxwlshKNgRDLEOAxq69hd",
    access_token_secret: "rGaCc0aqwVM9qgK7ZUiRm9ZAaw3c2wMtKsR9N8edpOIoI"
});

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin' : '*' });

    client.get("search/tweets", {q: "firefox"}, function (error, tweets) {
        if (error) {
            response.end("{ err: 'An error happened'}");
        } else {
            var json = [];
            for(var i=0; i < tweets.statuses.length; i++) {
                json.push({name: tweets.statuses[i].user.name, text: tweets.statuses[i].text, handle: tweets.statuses[i].user.screen_name});
            }

            response.end(JSON.stringify(json));
        }
    });

}).listen(port);