requirejs.config({
	paths: {
		'jquery': 'vendor/jquery/jquery',
		'underscore': 'vendor/underscore-amd/underscore',
		'backbone': 'vendor/backbone-amd/backbone',
		'text': 'vendor/requirejs-text/text',
		'select2': 'vendor/select2/select2.min',
		'bootstrap': 'vendor/bootstrap/dist/js/bootstrap.min',
		'templates': '../templates'
	}
});

requirejs([
	'app'
], function(AppView) {
	new AppView();
});
