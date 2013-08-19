define([
	'jquery',
	'underscore',
	'backbone',
	'views/stocks/stocksView'
], function($, _, Backbone,
	stocksView) {

	var App = Backbone.View.extend({

		initialize: function() {
			this.renderLayout();
		},

		renderLayout: function(){
			stocksView.render();
		}

	});

	return App;
});