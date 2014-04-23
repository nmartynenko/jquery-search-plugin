### jQuery search plugin [![Build Status](https://travis-ci.org/nmartynenko/jquery-search-plugin.png?branch=master)](https://travis-ci.org/nmartynenko/jquery-search-plugin)

This plugin makes easier search over text nodes of static or dynamical html content.

This plugin has been tested in Firefox 3+, Internet Explorer 7, 8, 9 and Chrome 11+

### Main Features ###
* searches and highlights/replaces text

* previous/next or indexed search

* searches over both dynamic and static HTML content

* optional external dependencies

### License ###
The plugin is open sourced under <a href="http://www.opensource.org/licenses/mit-license.php">MIT</a> license.
If this license doesn't suit you mail me at n.martynenko (at) aimprosoft.com.

### Download ###
* <a href="https://raw.github.com/nmartynenko/jquery-search-plugin/master/jquery.search.js">jquery.search.js</a>
* <a href="https://raw.github.com/nmartynenko/jquery-search-plugin/master/jquery.search.min.js">jquery.search.min.js</a>

### Known Issues ###
Plugin hasn't been tested yet in many cases. So I would appreciate any feedback.

### Getting started ###

    var searcher = jQuery("#searchSelector").search(options);

Method "search" of jQuery object returns "searcher" object, which is used for search.

### Dependencies ###
Plugin has the only one strong dependency &mdash; <a href="http://jquery.com">jQuery</a> 1.4.2+.
Though it optionaly depends on <a href="http://flesler.blogspot.com/2007/10/jqueryscrollto.html">jQuery ScrollTo plugin</a> (for smooth scrolling to selected element) and <a href="http://opensource.csimon.info/#page=textSelect"> jQuery textSelect plugin </a> (for highlighting of search's result rather than highlight the whole DOM-element).

### Options of plugin ###

```js

    //print debug information into console
    "debug" : false,
    
    //in case if it is set to false, searcher after it's creation calls nextConcurrence method
    //if you would like to do some other stuff rather than it, please use onCreate callback
    "createOnly" : true,
    
    //is case-sensitive search
    "caseSensitive" : false,
    
    //if it is set, then search result will be always updated in context container
    "searchSelector" : "",
    
    //start position
    //NOTE following:
    //1. position starts with 0.
    //2. if you call nextConcurrence method, it will be increased before searching element
    "position" : -1,
    
    //search of order
    // can be "up" (or true), "down" (or false)
    "searchOrder" : "down",
    
    //type of after finding behaviour
    // can be:
    // 1. highlight — highlight the whole element
    // 2. highlightSelected — highlight selected text of element
    // 3. replace — replace
    // 4. none — do nothing, usefull with afterSearch callback
    "searchType" : "highlight",
    
    //text to search. can be set via setText method
    "text" : null,
    
    //text to replace (when "searchType" is "replace" only)
    "replaceBy" : "",
    
    //if this parameter is true, page automatically scroll to selected element
    //NOTE: it might not work in case if selector is different than needed, use afterSearch callback in that case
    "scrollTo" : false,
    
    //callback called after creating of "searcher" object
    onCreate : function(){},
    
    //calback called before next search
    beforeSearch : function(){},
    
    //callback called after next search
    afterSearch : function(textEl){}
    
```
    
### Plugin methods ###

* __reset__ &mdash; resets search position

* __getText__ &mdash; returns current search text

* __setText(newText)__ &mdash; updates search text; search position is set to default

* __getPosition__ &mdash; returns current search position

* __setPosition(newPostion)__ &mdash; sets new search position; if it is more than concurrences number, it will be reseted

* __getSearchOrder__ &mdash; returns current search order (string)

* __setSearchOrder(newSearchOrder)__ &mdash; change search order; search position won't be changed

* __getSearchType__ &mdash; returns current search type

* __setSearchType(newSearchType)__ &mdash; changessearch type; search position won't be changed

* __getConcurrencesNumber__ &mdash; returns number of search concurrences

* __nextСoncurrence(searchOrder)__ &mdash; finds next search concurrence; _searchOrder_ &mdash; next/previous concurrence, if this parameter isn't set, default _searchOrder_ is used

* __findConcurrence(position, searchType)__ &mdash; find _N_ concurrence; position &mdash; index of search concurrence, if it isn't set, current position is used; _searchType_ &mdash; type of behaviour after searching, if it isn't set default _searchType_ is used