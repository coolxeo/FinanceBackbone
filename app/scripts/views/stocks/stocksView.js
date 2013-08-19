define([
	'backbone',
	'text!templates/stocks/stockSearchList.html',
	'text!templates/stocks/stockList.html'
], function(Backbone,
	stockSearchList,
	stockList) {

	var StocksView = Backbone.View.extend({
		stocks: [],

		render: function() {
			this.tmplOut = _.template(stockSearchList);
			this.tmplList = _.template(stockList);
			
			this.bindEvents();
			this.refreshStockList();
		},

		bindEvents: function() {
			$("#search").bind("keypress", $.proxy(function(event) {
				if(event.which == 13) {
					this.searchStock();
				}
			}, this));

			$("#search-list").delegate("li", "click", $.proxy(function(event) {
				var $el = $(event.currentTarget);
				this.addStock($el);
			}, this));

			$("#stock-list").delegate("li", "click", $.proxy(function(event) {
				var $el = $(event.currentTarget);
				this.removeStock($el);
			}, this));
		},

		searchStock: function() {
			$.ajax({
				url: "http://dev.markitondemand.com/Api/Lookup/jsonp?input=" + $("#search").val(),
				dataType: 'jsonp' ,
				success: $.proxy(function(data) {
					$("#search-list").html(this.tmplOut({
						json: data
					}));
				}, this)
			});
		},

		refreshStockList: function() {
			this.symbolData = [];

			_.each(this.stocks, $.proxy(function(stock) {
				$.ajax({
					url: "http://dev.markitondemand.com/Api/Quote/jsonp?symbol=" + stock,
					dataType: 'jsonp' ,
					success: $.proxy(function(data) {
						this.symbolData[this.symbolData.length] = {
							name: data.Data.Symbol,
							last: data.Data.LastPrice,
							change: Math.round(data.Data.Change * Math.pow(10,2)) / Math.pow(10,2)
						};

						if(this.symbolData.length == this.stocks.length) {
							this.renderStockList();
						}
					}, this)
				});
			}, this));

			clearTimeout(this.refreshTimeout);
			this.refreshTimeout = setTimeout($.proxy(this.refreshStockList, this), 5000);
		},

		renderStockList: function() {
			$("#stock-list").html(this.tmplList({ 
				json: this.symbolData
			}));
		},

		addStock: function($el) {
			this.stocks[this.stocks.length] = $el.data("symbol");
			$el.remove();
			this.refreshStockList();
		},

		removeStock: function($el) {
			this.stocks.splice(this.stocks.indexOf($el.data("symbol")), 1);
			$el.remove();
			this.refreshStockList();
		}

	});

	return new StocksView();
});