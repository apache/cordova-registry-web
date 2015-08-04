var React = require('react'),
    Plugin = require('./plugin.jsx');

var timer=null;

var PluginList = React.createClass({
    statics: {
        contains: function(values, pluginInfo) {
            var allValuesPresent = true;
            if(values.length == 0) {
                return allValuesPresent;
            }
            if(!pluginInfo) {
                return false;
            }
            values.forEach(function(value) {
                var valuePresent = false;
                for(var index=0; index < pluginInfo.length; index++) {
                    if(pluginInfo[index] && pluginInfo[index].toLowerCase().indexOf(value) > -1) {
                        valuePresent = true;
                    }
                }
                if(!valuePresent) {
                    allValuesPresent = false;
                }
            });
            return allValuesPresent;
        },
        populateFilters: function(filterText)
        {
            var searchStrings = filterText.split(" ");
            var filters = [];
            filters['platforms'] = [];
            filters['authors'] = [];
            filters['licenses'] = [];
            filters['searchWords'] = [];

            searchStrings.forEach(function(searchString) {
                var keywords = searchString.split(":");
                if(keywords.length == 1) {
                    var param = keywords[0].trim();
                    if(param) {
                        filters['searchWords'].push(param);
                    }
                }
                else if(keywords[1].trim()) {
                    var param = keywords[1].trim();
                    switch(keywords[0]) {
                        case 'platform':
                            filters['platforms'].push(param);
                            break;
                        case 'author':
                            filters['authors'].push(param);
                            break;
                        case 'license':
                            filters['licenses'].push(param);
                            break;
                        default:
                            filters['searchWords'].push(searchString);
                    }
                }
                else {
                    filters['searchWords'].push(searchString);
                }
            });
            return filters;
        }
    },
    render: function() {
        var plugins = [],
            filterText = this.props.filterText.toLowerCase();

        var delay = (function(){
          return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
          };
        })();

        delay(function(){
            window.history.pushState({"filterText":filterText}, "", "?q=" + filterText);
            ga('send', 'pageview', '/index.html?q=' + filterText);
        }, 2000 );

        var filters = PluginList.populateFilters(filterText);

        this.props.plugins.forEach(function(plugin) {
            var fullPluginText = plugin.name.concat(plugin.author, plugin.keywords, plugin.license, plugin.description);
            if(PluginList.contains(filters['platforms'], plugin.keywords)
                && PluginList.contains(filters['authors'], plugin.author)
                && PluginList.contains(filters['licenses'], plugin.license)
                && PluginList.contains(filters['searchWords'], fullPluginText)) {
                    plugins.push(<Plugin plugin={plugin} key={plugin.author + plugin.name}/>);
            }
        }.bind(this));
        return (
            <div className="contentwrap">
                <ul className="pluginList">
                    {plugins}
                </ul>
            </div>
        );
    }
});

module.exports = PluginList;
