'use strict'
var url_control = require(__dirname + '/../controllers/url_control');
var url_control_jsonp = require(__dirname + '/../controllers/url_control_jsonp');
var url_control_enc = require(__dirname + '/../controllers/url_control_enc');

var routes = function(app) {
	// this is for legact rest apis for android
	app.post('/zoco/client/register',url_control.register);
	app.post('/zoco/client/register_book',url_control.register_book);
	app.post('/zoco/client/post_test', url_control.post_test);
	app.get('/zoco/client/get_test',url_control.get_test);
	// encrypt
	app.post('/zoco/client/get_key', url_control_enc.get_key );

	// jsonp
	app.get('/zoco/client/jsonp', url_control_jsonp.jsonp_wrapper );

	// Encrypt Test
	app.post('/test_enc', url_control_enc.url_test_enc );
}
exports.route = routes;
