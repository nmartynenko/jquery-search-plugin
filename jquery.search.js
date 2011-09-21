/**
 * search jQuery Plug-in
 *
 * Copyright (c) 2011, Nikolay Martynenko
 *
 * Licensed under The MIT License which can be obtained from <http://www.opensource.org>
 *
 * search is a jQuery Plug-in enables easy search and highlight/replace manipulation over the DOM text nodes.
 *
 * It uses jQuery textSelect plugin for highlighting of search result(otherwise it highlights whole element).
 * http://opensource.csimon.info/#page=textSelect
 *
 * It uses jQuery scrollTo plugin for smooth scrolling to selected element.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function($) {
    $.extend($, {
        search: function(elem, options){
            //if selector or DOM object
            if ((typeof elem) === "string" || elem.tagName){
                elem = $(elem);
            }
            //if not jquery object
            else if (!elem.jquery){
                elem = false;
            }

            // if nothing is selected, return nothing; can't chain anyway
            if (!elem || !elem.length) {
                options && options.debug && window.console && console.warn("nothing selected, can't search, returning nothing");
                return;
            }

            // check if a searcher for this container was already created
            var searcher = $.data(elem, 'searcher');

            if (!searcher) {
                searcher = new $.searcher(options, elem);

                //put searcher into data
                $.data(elem, 'searcher', searcher);
            }

            //if find first concurrency
            if (searcher.settings.createOnly === false){
                //find first concurrency
                searcher.nextСoncurrence();
            }

            return searcher;
        }
    });

    $.extend($.fn, {
        /**
         * Create searcher for container
         *
         * @param options - search options
         */
        search : function(options){
            return $.search(this, options);
        }
    });

    $.searcher = function(options, container) {
        this.settings = $.extend(true, {}, $.searcher.defaults, options);
        this.currentContainer = container;
        this.currentPosition = this.settings.position;
        this.settings.onCreate();
    };

    $.extend($.searcher, {

        defaults : {
            "debug" : false,
            "createOnly" : true,
            "searchSelector" : "", //if it is set,then search result will be always always updated in context container
            "position" : -1,
            "searchOrder" : "down", //"up" -> true, "down" -> false
            "searchType" : "highlight",//"highlight", "highlightSelected", "replace"
            "text" : null,
            "replaceBy" : "",
            "scrollTo" : false,//might not work in case of selector different than needed, use afterSearch functionality
            onCreate : function(){},
            beforeSearch : function(){},
            afterSearch : function(textEl){}
        },

        prototype : {
            reset : function(){
                this.currentPosition = -1;
            },

            getText : function(){
                return this.settings.text;
            },

            setText : function(text){
                this.settings.text = text;

                //update number of concurrences
                this.reset();
            },

            getPosition : function(){
                return this.settings.position;
            },

            setPosition : function(position){
                this.settings.position = position;
            },

            setSearchOrder : function(searchOrder){
                this.settings.position = searchOrder === "up" ? "up" : "down";
            },

            setSearchType : function(searchType){
                this.settings.searchType = searchType === "replace" ? "replace" :
                    (searchType === "highlightSelected" ? "highlightSelected" : "highlight");
            },

            getConcurrencesNumber : function(){
                if (!this.settings.text){
                    this._debug("Empty string so nothing found");
                    return;
                }

                var escapedText = this._escape(this.settings.text);

                return this._filter(escapedText).length;
            },

            nextСoncurrence : function(searchOrder){

                var concurrencesNumber = this.getConcurrencesNumber();

                if (concurrencesNumber == 0){
                    this._debug("Nothing has been found");
                    return;
                }

                var position = this.currentPosition;
                var _searchOrder = this._getProperty("searchOrder", searchOrder);

                //if not only one concurrence
                if (concurrencesNumber != 1){
                    //if search order is "up"
                    if (_searchOrder === true || _searchOrder === "up"){
                        position = position <= 0 ? concurrencesNumber - 1 : position - 1;
                    }
                    //otherwise
                    else {
                        position = position == concurrencesNumber - 1 ?  0 : position + 1;
                    }
                }

                this.findConcurrence(position, this.settings.searchType);
            },

            findConcurrence : function(position, searchType){
                this.settings.beforeSearch();

                if (!this.settings.text){
                    this._debug("Text shouldn't be empty");
                    return;
                }

                position = this._getProperty("startPosition", position);
                searchType = this._getProperty("searchType", searchType);
                var escapedText = this._escape(this.settings.text);

                var textEl = this._filter(escapedText).eq(position);

                //if need to replace text
                if (searchType === "replace"){
                    this._replace(textEl)
                }
                //it works in case of textSelect jQuery plugin presence
                else if (searchType === "highlightSelected" && $.fn.textSelect){
                    this._highlightSelected(textEl);
                }
                //otherwise
                else {
                    this._highlightAll(textEl);
                }

                this.currentPosition = position;

                //scroll to element in case of scrollTo jQuery plugin presence
                if (this.settings.scrollTo && $.fn.scrollTo){
                    this.currentContainer.scrollTo(textEl.parent());
                }

                this.settings.afterSearch(textEl);
            },

            _filter : function(escapedText){
                if (this.settings.searchSelector){
                    var $findResult = this.currentContainer.find(this.settings.searchSelector);
                } else {
                    var $findResult = this.currentContainer;
                }

                return $findResult.contents(":contains('"+ escapedText +"')");
            },

            _highlightSelected : function(textEl){
                var startPosition = textEl.text().indexOf(this.settings.text);
                var endPosition = startPosition + this.settings.text.length;

                $.textSelect('setRange', {
                    start:startPosition,
                    startElement: textEl.parent(),
                    end : endPosition,
                    endElement : textEl.parent()
                });
            },

            _highlightAll : function(textEl){
                //if textSelect jQuery plugin presence
                if ($.fn.textSelect){
                    textEl.parent().textSelect("select");
                } else {
                    this._highlightAllInternal(textEl);
                }
            },

            //internal highlighting function
            _highlightAllInternal : function(textEl){
                var text = textEl.parent()[0];

                if ($.browser.msie) {
                    var range = document.body.createTextRange();
                    range.moveToElementText(text);
                    range.select();
                }

                else if ($.browser.mozilla || $.browser.opera) {
                    var selection = window.getSelection();
                    var range = document.createRange();
                    range.selectNodeContents(text);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }

                else if ($.browser.safari) {
                    var selection = window.getSelection();
                    selection.setBaseAndExtent(text, 0, text, 1);
                }
            },

            _replace : function(textEl){
                var replacedText = textEl.text().replace(this.settings.text, this.settings.replaceBy);
                textEl.parent().text(replacedText);
            },

            _getProperty : function(propertyName, defaultValue){
                return defaultValue == null || typeof defaultValue === "undefined" ? this.settings[propertyName] : defaultValue;
            },

            _escape : function(text){
                 return text.replace(/([#;&,\.\+\*\~':"\!\^$\[\]\(\)=>\|])/g, "\\$1");
            },

            _debug : function(message){
                this.settings.debug &&  window.console && console.debug(message);
            }
        }
    });
})(jQuery);