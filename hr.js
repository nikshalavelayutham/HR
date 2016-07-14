/**
 * Created by Nikshala on 6/1/2016.
 * Reference https://www.npmjs.com
 * I used the examples given in the documentation page of npm packages as a reference
 */
var https = require("https");
var fs = require("fs");
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var qs = require("querystring");
var verifier = require('google-id-token-verifier');

var appRoot = require('app-root-path');
var options = {
    key: fs.readFileSync(appRoot + "/server.key"),
    cert: fs.readFileSync(appRoot + "/server.crt"),
    passphrase: "12345678"
};

var serve = serveStatic(appRoot + "/");


var server = https.createServer(options, function (request, response) {

    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });

        request.on('end', function () {
            var post = qs.parse(body);

            if (request.url === "/redirect_checkout") {
                handleRedirectCheckout(post, response);
            }
            else if(request.url === "/redirect_orderprocess"){
                handleRedirectOrderSuccess(post, response);
            }
        });

    } else {
        var done = finalhandler(request, response);
        serve(request, response, done);
    }
});
server.listen(8000);

function handleRedirectCheckout(body, response) {
    // ID token from client.
    var IdToken = body["idtoken"];
    // app's client IDs to check with audience in ID Token.
    var clientId = "314035108873-4metognja96266m14vd4c93lvlne55ag.apps.googleusercontent.com";

    verifier.verify(IdToken, clientId, function (err, tokenInfo) {
        if (!err) {
            response.writeHead(302, {
                'Location': 'brickcheckout/checkout.html'
                //add other headers here...
            });
            response.end();
        }
    });
}
function handleRedirectOrderSuccess(postdata, response) {
    var order = JSON.parse(postdata.order);
    console.log(order.address);
    console.log(order.payment);
    console.log(order.orderdetails);
    //Todo: Implement Order Processing Logic Here
    response.writeHead(302, {
        'Location': 'brickcheckout/ordersuccess.html'
    });
    response.end();
}