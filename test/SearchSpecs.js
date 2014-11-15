/*global module */

var DuckDuckGo = function(browser) {
	
	this.reset = function() {
		browser.url('http://www.duckduckgo.com').waitForElementVisible('body', 5000);
		return this;
	};

	this.search = function(term) {
		browser
			.setValue('#search_form_input_homepage', term)
			.click('#search_button_homepage');
		return this;
	};

	this.resultsShouldContain = function(text) {
		browser
			.waitForElementVisible('.results', 1000)
			.assert.containsText('.results', text);
		return this;
	};
};


module.exports = {

	before: function(browser) {
		this.ddg = new DuckDuckGo(browser);
	},

	beforeEach: function(browser) {
		this.ddg.reset();
	},

	'search single word' : function(browser) {
		this.ddg.search('gato')
			.resultsShouldContain('gato');
	},

	'search exact phrase': function(browser) {
		this.ddg.search('"perro verde"')
			.resultsShouldContain('perro verde');
	},

	after: function(browser) {
		browser.end();
	}
};
