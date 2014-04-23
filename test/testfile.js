var assert = require("assert"),
    jsdom = require("jsdom"),
    jquery = require("jquery");

//define JSDOM window
var window = jsdom.jsdom().parentWindow;
//expose global jQuery object
jQuery = jquery(window);

//Add libraries
var fs = require('fs');
var vm = require('vm');
var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);

includeInThisContext(__dirname + "/../lib/jquery.scrollTo.min.js");
includeInThisContext(__dirname + "/../lib/jquery.textselect.min.js");
includeInThisContext(__dirname + "/../jquery.search.min.js");

/**
 * Define all specs
 */
describe("Application's scope", function(){

    it("should have jQuery object in the scope", function(){
        assert.ok(!!jQuery === true);
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