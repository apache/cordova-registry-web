var React = require('react'),
    Plugin = require('./plugin.jsx');
    EmptyPlugin = require('./empty-plugin.jsx');

var InitialPageLength = 10;
var PageExtensionLength = 20;

/*
    States site loaded
 */
var PluginList = React.createClass({
    getInitialState: function() {
        return { bootstrapped: false }
    },
    componentWillReceiveProps: function() {
        // Recieving a set of plugins
        this.setState({
            bootstrapped: true,
            searchPage: 0
        });
    },
    increaseSearchResults: function() {
        this.setState({ searchPage: this.state.searchPage + 1 });
    },
    render: function() {
        if (!this.state.bootstrapped) {
            var emptyPluginList = [];

            for (var i = 0; i < InitialPageLength; i++) {
                emptyPluginList.push(<EmptyPlugin key={"emptyPlugin" + i}/>)
            };

            return (
                <div className="contentwrap">
                    <ul className="pluginList">
                        {emptyPluginList}
                    </ul>
                </div>
            )
        } else {
            var plugins = this.props.plugins;
            var showMore = null, visiblePlugins = [];
            if (plugins.length - this.state.searchPage * PageExtensionLength > InitialPageLength) {
                showMore =
                    <div className="pluginCard" onClick={this.increaseSearchResults} style={{cursor: 'pointer'}}>
                        <div style={{ display: 'table', width:100 + '%', minHeight: 5 + 'rem'}}>
                            <div style={{ display: 'table-cell', verticalAlign: 'middle'}}>
                                <div style={{textAlign: 'center'}}>Show More</div>
                            </div>
                        </div>
                    </div>;
            }
            for (var i = 0; i < InitialPageLength + this.state.searchPage * PageExtensionLength; i++) {
                if (plugins[i]) {
                    visiblePlugins.push(<Plugin plugin={plugins[i]} key={i}/>);
                } else {
                    break;
                }
            };
            return (
                <div className="contentwrap">
                    <ul className="pluginList">
                        {visiblePlugins}
                    </ul>
                    {showMore}
                </div>
            );
        }
    }
});

module.exports = PluginList;
