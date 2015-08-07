var React = require('react');

var Plugin = React.createClass({
    render: function() {
        return (
            <li>
                <div className="pluginCard">
                    <div style={{ textAlign: 'center', height: 10 + "rem"}}>
                        <span style={{ display: 'inline-block', height: 100 + "%", verticalAlign: 'middle'}} />
                        <img style={{verticalAlign: 'middle'}} src="img/loading.gif" />
                    </div>
                </div>
            </li>
        )
    }
});

module.exports = Plugin;
