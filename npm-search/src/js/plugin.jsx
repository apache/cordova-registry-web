var React = require('react'),
    SupportedPlatforms = require('./supportedplatforms.jsx'),
    classNames      = require('classnames');

var Plugin = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        return this.props.plugin !== nextProps.plugin;
    },
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

        if(this.props.plugin.downloadCount) {
            var downloadCount = this.props.plugin.downloadCount.toLocaleString();
            downloadField = <p><small> {downloadCount} downloads last month</small></p>;
        }
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
});

module.exports = Plugin;
