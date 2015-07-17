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
});

module.exports = SearchBar;
