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
            response.write('Connection established to ' + url +"\n");

            // do some work here with the database.
            var collection = db.collection("user");

            collection.update({name: "modulus user"}, {$set: {enabled: false}}, function(err, result) {
                if (err) {
                    response.write("Error updating: " + err + "\n");
                } else if (result) {
                    response.write("Successfully updated "+result+" rows\n");
                } else {
                    response.write("No document found corresponding to this criteria");
                }

                db.close();
                response.end("End of update");
            });
        }
    });

}).listen(port);