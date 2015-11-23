var mongodb = require("mongodb");
var http = require("http");
var port = process.env.PORT || 1337;
var url = "mongodb://1513048:AQWzsx@ds057234.mongolab.com:57234/1513048";
var MongoClient = new mongodb.MongoClient;

http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Connecting \n');
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        response.write('Connection Made \n');
        if (err) {
            response.write('Unable to connect to the mongoDB server. Error:' + err + "\n");
            //Error so close connection
            db.close();
        } else {
            //HURRAY!! We are connected. :)
            response.write('Connection established to' + url + "\n");

            // do some work here with the database.
            var collection = db.collection("users");
            var results = collection.find({name: "modulus user"});

            results.each(function (err, result) {
                if (err) {
                    response.end("Error retrieving: " + err + "\n");
                    db.close();
                } else {
                    if (result == null) {
                        response.end("End retrieve\n");
                        db.close();
                    } else {
                        response.write("Fetched " + result.name + " : " + result.age + " y/o, roles " + result.roles.toString() + "\n");
                    }
                }
            });
        }
    });

}).listen(port);