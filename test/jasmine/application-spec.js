var fs = require('fs'),
    jsdom = require("jsdom"),
    jquery = require("jquery");

//load demo HTML
var html = fs.readFileSync(__dirname + "/../../demo/demo.html");
//define JSDOM window
var window = jsdom.jsdom(html).parentWindow;
//expose global jQuery object
/*global.*/jQuery = jquery(window).noConflict();

//include scrollTo plugin
require("../../lib/jquery.scrollTo.min.js");
//include textselect plugin
require("../../lib/jquery.textselect.min.js");
//include our plugin
require("../../jquery.search.js");

/**
 * Define all specs
 */
describe("Application's scope", function(){

    var $ = jQuery;

    it("should have jQuery object in the global scope", function(){
        expect($).toBeDefined();
    });

    it("should have jQuery object in the window scope", function(){
        expect(window.jQuery).toBeDefined();
    });

    it("should have jQuery.fn.scrollTo method in the scope and it should be a function", function(){
        expect($.isFunction($.fn.scrollTo)).toBeTruthy();
    });

    it("should have jQuery.scrollTo method in the scope and it should be a function", function(){
        expect($.isFunction($.textSelect)).toBeTruthy();
    });

    it("should have jQuery.search and jQuery.fn.search methods in the scope and they should be functions", function(){
        expect($.isFunction($.search)).toBeTruthy();
        expect($.isFunction($.fn.search)).toBeTruthy();
    });
});

describe("Application's behaviour", function(){
    var emptySelector = "#empty_selector",
        rightSelector = "#searchContent",
        //shortcut for jQuery
        $ = jQuery;

    it("wrong selector should not find any elements", function(){
        expect($(emptySelector).size()).toBe(0);
    });

    it("right selector should find only one element", function(){
        expect($(rightSelector).size()).toBe(1);
    });

    it("should create nothing on wrong selector", function(){
        expect($(emptySelector).search()).toBeUndefined();
    });

    it("should create new search object on correct selector", function(){
        expect($(rightSelector).search()).toBeDefined();
    });

    it("should contain searcher object as data attribute only after it creates a concrete search object", function(){
        var searchContent = $("#searchContent");
        //before
        expect($.data(searchContent, "searcher")).toBeUndefined();
        //call search method
        searchContent.search();
        //after
        expect($.data(searchContent, "searcher")).toBeDefined();
    });

});

describe("Searcher's methods", function(){

    var rightSelector = "#searchContent",
        //shortcut for jQuery
        $ = jQuery,
        defaultSettings = $.searcher.defaults;

    it("should have default settings, when nothing is provided as parameters", function(){
        var searcher = $(rightSelector).search();

        expect(searcher.settings).toEqual(defaultSettings);
    });
});