This plugin makes easier search over text nodes of static or dynamical html content.

This plugin has been tested in Firefox 3+, Internet Explorer 7, 8, 9 and Chrome 11+

### Main Features ###
* search and highlight/replace text
* previous/next or indexed search
* search over both dynamic and static HTML content
* optional external dependencies

### License ###
The plugin is open sourced under <a href="http://www.opensource.org/licenses/mit-license.php">MIT</a> license.
If this license doesn't suit you mail me at n.martynenko (at) aimprosoft.com.

### Download ###
* <a href="https://raw.github.com/nmartynenko/jquery-search-plugin/master/jquery.search.js">jquery.search.js</a>
* <a href="https://raw.github.com/nmartynenko/jquery-search-plugin/master/jquery.search.min.js">jquery.search.min.js</a>

### Known Issues ###
Plugin hasn't been tested yet in many cases. So I would be grateful for any feedback.

### Getting started ###

    var searcher = jQuery("#searchSelector").search(options);

Method "search" of jQuery object returns "searcher" object, which is used for search.

### Options of plugin ###

    //print debug information into console
    "debug" : false,
    
    //in case of false searcher after creating call nextConcurrence method
    //if you would like to do some other stuff, please use onCreate callback
    "createOnly" : true,
    
    //if it is set,then search result will be always always updated in context container
    "searchSelector" : "",
    
    //start postion
    //NOTE:
    //1. position starts with 0.
    //2. if you call nextConcurrence method, it will be increased before finding element
    "position" : -1,
    
    //search of order
    // can be "up" (or true), "down" (or false)
    "searchOrder" : "down",
    
    //type of finding behaviour
    // can be:
    // 1. highlight - highlight whole element
    // 2. highlightSelected - highlight selected text of element
    // 3. replace - replace 
    // 4. none - do not do anything, usefull with afterSearch callback
    "searchType" : "highlight",
    
    //text to search. can be set via setText method
    "text" : null,
    
    //text to replace (when "searchType" is "replace" only
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
    
### Plugin methods ###
* <b>reset</b> - reset search position
* <b>getText</b> - returns current search text
* <b>setText(newText)</b> - update search text; search position is set to default
* <b>getPosition</b> - returns current search position
* <b>setPosition(newPostion)</b> - set new search position; if it is more than concurrences number, it will be reseted
* <b>getSearchOrder</b> - returns current search order (string)
* <b>setSearchOrder(newSearchOrder)</b> - change search order; search position won't changed
* <b>getSearchType</b> - returns current search type
* <b>setSearchType(newSearchType)</b> - change search type; search position won't changed
* <b>getConcurrencesNumber</b> - returns number of search concurrences
* <b>nextСoncurrence(searchOrder)</b> - find next search concurrence; searchOrder - next/previous concurrence, if this parameter isn't set, default searchOrder is used
* <b>findConcurrence(position, searchType)</b> - find N concurrence; postion - index of search concurrence, if it isn't set, current position is used; searchType - type of behaviour after searching, if it isn't set default searchType is used
