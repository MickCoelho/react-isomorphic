
/*global fetch*/
'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    Router = require( 'react-router' ),
    mui = require( 'material-ui' ),
    LeftNav = mui.LeftNav,
    MenuItem = mui.MenuItem,
    AppBar = mui.AppBar,
    AppCanvas = mui.AppCanvas,
    RaisedButton = mui.RaisedButton,
    IconButton = mui.IconButton,
    FontIcon = mui.FontIcon;

require( 'isomorphic-fetch' );

var Nav = React.createClass( {
    mixins: [ Router.State ],

    menuItems: [
    { route: '/', text: 'Home' },
    { route: '/performance-improvements', text: 'Performance improvements' },
    { route: '/folder-structure', text: 'Folder structure' },
    { route: '/task-breakdown', text: 'Task breakdown' },
    { route: '/known-issues', text: 'Known issues' }
    ],

    getInitialState: function() {
        return {
            isDocked: false
        };
    },

    render: function() {

        var title =
            this.context.router.isActive( '/' ) ? 'Home' :
            this.context.router.isActive( '/performance-improvements' ) ? 'Performance improvements' :
            this.context.router.isActive( '/folder-structure' ) ? 'Folder structure' :
            this.context.router.isActive( '/task-breakdown' ) ? 'Task breakdown' :
            this.context.router.isActive( '/known-issues' ) ? 'Known issues' : '';

        var githubButton = (
          <IconButton
            className="github-icon-button"
            iconClassName="muidocs-icon-custom-github"
            href="https://github.com/MickCoelho/" target="_blank"
            linkButton={true}/>
        );

        var header = <div className="logo" onClick={this._onHeaderClick}>react-isomorphic</div>;

        return (
            <AppCanvas predefinedLayout={1} className="nav">
                <div>
                    <AppBar
                        className="mui-dark-theme"
                        onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}
                        title={title}
                        zDepth={0}>
                        {githubButton}
                    </AppBar>

                    <LeftNav className="leftNav"
                        ref='leftNav'
                        header={header}
                        docked={false}
                        isInitiallyOpen={false}
                        selectedIndex={this._getSelectedIndex()}
                        onChange={this._onLeftNavChange}
                        menuItems={this.menuItems} />
                </div>
            </AppCanvas>
        );
    },

    toggleNav: function() {
        this.refs.leftNav.toggle();
        this.setState( {
            isDocked: !this.state.isDocked
        } );
    },

    closeNav: function() {
        this.refs.leftNav.close();
        this.setState( {
            isDocked: false
        } );
    },

    _onMenuIconButtonTouchTap: function() {
        this.toggleNav();
    },

    _getSelectedIndex: function() {
        var currentItem;
        for ( var i = this.menuItems.length - 1; i >= 0; i-- ) {
            currentItem = this.menuItems[i];
            if ( currentItem.route && this.context.router.isActive( currentItem.route ) ) return i;
        };
        return 0;
    },

    _onLeftNavChange: function( e, key, payload ) {
        this.context.router.transitionTo( payload.route );
        this.closeNav();
    },

    _onHeaderClick: function() {
        this.context.router.transitionTo( '/' );
        this.closeNav();
    }

} );

module.exports = Nav;
