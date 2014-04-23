var fs = require('fs'),
    vm = require('vm'),
    assert = require("assert"),
    jsdom = require("jsdom"),
    jquery = require("jquery");

//load demo HTML
var html = fs.readFileSync(__dirname + "/../demo/demo.html");
//define JSDOM window
var window = jsdom.jsdom(html).parentWindow;
//expose global jQuery object
jQuery = jquery(window);

//Add libraries
var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);

//include scrollTo plugin
includeInThisContext(__dirname + "/../lib/jquery.scrollTo.min.js");
//include textselect plugin
includeInThisContext(__dirname + "/../lib/jquery.textselect.min.js");
//include our plugin
includeInThisContext(__dirname + "/../jquery.search.min.js");

/**
 * Define all specs
 */
describe("Application's scope", function(){

    it("should have jQuery object in the scope", function(){
        assert.ok(jQuery);
    });

    it("should have jQuery.fn.scrollTo method in the scope", function(){
        assert.ok(jQuery.isFunction(jQuery.fn.scrollTo));
    });

    it("should have jQuery.scrollTo method in the scope", function(){
        assert.ok(jQuery.isFunction(jQuery.textSelect));
    });

    it("should have jQuery.search and jQuery.fn.search methods in the scope", function(){
        assert.ok(jQuery.isFunction(jQuery.search));
        assert.ok(jQuery.isFunction(jQuery.fn.search));
    });
});

describe("Application's behaviour", function(){

    it("should create nothing on wrong selector", function(){
        assert.ok(!jQuery("empty_selector").search());
    });

    it("should create nothing on wrong selector", function(){
        assert.ok(!jQuery("#empty_selector").search());
    });

    it("should create new search object on correct selector", function(){
        assert.ok(jQuery("#searchContent").search());
    });

});