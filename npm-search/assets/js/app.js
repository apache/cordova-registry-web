var React = window.React = require('react'), // assign it to window for react chrome extension
    classNames = require('classnames'),
    App = {};

var OfficialPlugin = React.createClass({
    render: function() {
        return (
            <div id="featured"></div>
        );
    }
})

var SupportedPlatforms = React.createClass({
    render: function() {
        var keywords = this.props.keywords;
        var platformsSupported = [];
        // remove windows8 & windows dupe
        if (keywords.indexOf('cordova-windows') > -1 && keywords.indexOf('cordova-windows8') > -1) {
            keywords.splice(keywords.indexOf('cordova-windows8'), 1);
        }
        keywords.forEach(function(keyword) {
            switch (keyword) {
                case 'cordova-firefoxos':
                    platformsSupported.push(<li>FirefoxOS</li>);
                    break;
                case 'cordova-android':
                    platformsSupported.push(<li>Android</li>);
                    break;
                case 'cordova-amazon-fireos':
                    platformsSupported.push(<li>FireOS</li>);
                    break;
                case 'cordova-ubuntu':
                    platformsSupported.push(<li>Ubuntu</li>);
                    break;
                case 'cordova-ios':
                    platformsSupported.push(<li>iOS</li>);
                    break;
                case 'cordova-blackberry10':
                    platformsSupported.push(<li>Blackberry10</li>);
                    break;
                case 'cordova-wp7':
                    platformsSupported.push(<li>Windows Phone 7</li>);
                    break;
                case 'cordova-wp8':
                    platformsSupported.push(<li>Windows Phone 8</li>);
                    break;
                case 'cordova-windows8':
                case 'cordova-windows':
                    platformsSupported.push(<li>Windows</li>);
                    break;
                case 'cordova-browser':
                    platformsSupported.push(<li>Browser</li>);
                    break;
            }
        });
        return (
            <ul className="supportedPlatforms">{platformsSupported}</ul>
        );
    }
})

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        )
    },
    render: function() {
        return (
            <div className="col-xs-offset-2 col-xs-8">
                <div id="searchwrapper">
                    <input
                        className="searchBox"
                        type="search"
                        autoComplete="off"
                        placeholder={this.props.placeHolderText}
                        value={this.props.filterText}
                        ref="filterTextInput"
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
})

var Plugin = React.createClass({
    render: function() {
        var license = this.props.plugin.license;
        if (license && license.length > 1) {
            license = license[0];
        }
        var downloadField;
        

        var classes = classNames({
            'pluginCard': true,
            'featuredPlugin': this.props.plugin.isOfficial,
            'row': true
        });
        
        if(this.props.plugin.downloadCount)
            downloadField = <p><small>{this.props.plugin.downloadCount} downloads last month</small></p>;
        return (
              <li>
                <div className={classes}>
                    <div className="primaryContent col-xs-9">
                        <div className="header">
                            <h3><a href={'https://www.npmjs.com/package/' + this.props.plugin.name} target="_blank">{this.props.plugin.name}</a></h3>
                            <small className="pluginVersion">v{this.props.plugin.version}</small>
                            <small> by </small>
                            <small className="pluginAuthor">{this.props.plugin.author}</small>
                        </div>
                        <div className="pluginDesc">{this.props.plugin.description}</div>
                        <SupportedPlatforms keywords={this.props.plugin.keywords}/>
                    </div>
                    <div className="secondaryContent col-xs-3">
                        <div className="download">
                            <p></p>
                        </div>
                        <div className="extraInfo">
                            <p><small><strong>License:</strong> {license}</small></p>
                            {downloadField}
                            <p><small><em>Last updated {this.props.plugin.modified} days ago</em></small></p>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
})

var PluginList = React.createClass({
    render: function() {
        var plugins = [],
            filterText = this.props.filterText.toLowerCase();

        this.props.plugins.forEach(function(plugin) {
            if (plugin.name[0].indexOf(filterText) > -1) {
                plugins.push(<Plugin plugin={plugin} key={plugin.author + plugin.name}/>);
            }
        }.bind(this));
        return (
            <div className="col-xs-offset-2 col-xs-8">
                <ul className="pluginList">
                    {plugins}
                </ul>
            </div>
        );
    }
});


var App = React.createClass({
    getInitialState: function() {
        return {
            plugins: [],
            filterText: '',
            placeHolderText: 'Loading...'
        };
    },
    handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        });
    },

    componentDidMount: function() {
        var plugins = [],
            officialPlugins = require('./official-plugins.json').plugins,
            pluginCount = 0,
            self = this,
            queryHost = "http://npmsearch.com/query",
            queryFields = "fields=name,keywords,license,description,author,modified,homepage,version",
            queryKeywords = "q=keywords:%22ecosystem:cordova%22",
            queryInitialSize = 300;

        xhrRequest(queryHost + "?" + queryFields + "&" + queryKeywords + "&size=" + queryInitialSize + "&start=0", function(xhrResult) {
            plugins = xhrResult.results;
            pluginCount = xhrResult.total;
            if (pluginCount <= queryInitialSize) {
                processPlugins.bind(self, officialPlugins, plugins)();
            } else {
                xhrRequest(queryHost + "?" + queryFields + "&" + queryKeywords + "&size=" + (pluginCount - queryInitialSize) + "&start=" + queryInitialSize, function(xhrResult) {
                        plugins = [].concat(plugins, xhrResult.results);
                        processPlugins.bind(self, officialPlugins, plugins)();
                }, function() { console.log('xhr err'); });
            }
        }, function() { console.log('xhr err'); });

        var getDownloadCount = function(plugins,that) {
            var packageNames = "";
            for(var index=0; index < plugins.length; index++)
            {
                packageNames += plugins[index].name + ",";
                if(index%50 === 0 || index === plugins.length -1)
                {
                    xhrRequest("https://api.npmjs.org/downloads/point/last-month/" + packageNames, function(xhrResult) {
                        plugins.forEach(function(plugin) {
                            if(xhrResult[plugin.name])
                                plugin.downloadCount = xhrResult[plugin.name].downloads;
                        });
                        that.setState({
                            plugins: plugins
                        });
                    }.bind(self), function() { console.log('xhr err'); });
                    packageNames = "";
                }
            }
        }

        function processPlugins(officialPlugins, plugins) {
            var pluginCount = plugins.length,
                dateNow = new Date(),
                oneDay = 1000*60*60*24;

            officialPlugins.forEach(function(plugin) {
                for (var i = 0; i < plugins.length; i++) {
                    // Check if plugin name is in official list
                    if (plugins[i].name[0] === plugin) {
                        plugins[i].isOfficial = true;
                        return;
                    }
                };
            });

            for (var i = 0; i < plugins.length; i++) {
                // Calculate last time plugin is modified (in days)
                plugins[i].modified = Math.ceil((dateNow - new Date(plugins[i].modified)) / oneDay);
            };

            if (this.isMounted()) {
                this.setState({
                  plugins: plugins,
                  placeHolderText: 'Search ' + pluginCount + ' plugins...'
                });
                getDownloadCount(plugins,this);
            }
        }
    },

    render: function() {
        return (
            <div>
                <div className="row" id="headerBackground">
                    <div className="col-xs-offset-2 col-xs-8">
                        <div id="topContent" className="row">
                            <div className="col-xs-3">
                                <div id="pluggy"></div>
                            </div>
                            <div className="col-xs-9">
                                <p className="discover-message">Search Cordova</p>
                                <br/>
                                <p className="discover-message">Plugins</p>
                            </div>
                        </div>
                    </div>
                    <SearchBar
                        filterText={this.state.filterText}
                        placeHolderText={this.state.placeHolderText}
                        onUserInput={this.handleUserInput}
                    />
                </div>
                <div className="row">
                    <PluginList
                        plugins={this.state.plugins}
                        filterText={this.state.filterText}
                    />
                </div>
            </div>
        );
    }
});

App.start = function() {
    React.render(
        <App />,
        document.getElementById('container')
    )    
};

function xhrRequest(url, success, fail) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE ) {
            if(xhr.status == 200){
                success(JSON.parse(xhr.responseText));
                return;
            } else {
                fail();
                return;
            }
        }
    }.bind(this)
    xhr.open("GET", url, true);
    xhr.send();
}


module.exports = window.App = App;
