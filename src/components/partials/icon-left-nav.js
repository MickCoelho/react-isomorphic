var React = require('react'),
  KeyCode = require('material-ui/lib/js/utils/key-code'),
  Classable = require('material-ui/lib/js/mixins/classable'),
  WindowListenable = require('material-ui/lib/js/mixins/window-listenable'),
  Overlay = require('material-ui/lib/js/overlay'),
  Paper = require('material-ui/lib/js/paper'),
  Menu = require('./icon-menu');

var LeftNav = React.createClass({ displayName: "LeftNav",

  mixins: [ Classable, WindowListenable ],

  propTypes: {
    docked: React.PropTypes.bool,
    header: React.PropTypes.element,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      docked: true
    };
  },

  getInitialState: function() {
    return {
      open: this.props.docked
    };
  },

  toggle: function() {
    this.setState({ open: !this.state.open });
    return this;
  },

  close: function() {
    this.setState({ open: false });
    return this;
  },

  open: function() {
    this.setState({ open: true });
    return this;
  },

  render: function() {
    var classes = this.getClasses('mui-left-nav', {
        'mui-closed': !this.state.open
      }),
      selectedIndex = this.props.selectedIndex,
      overlay;

    if (!this.props.docked) overlay = React.createElement(Overlay, { show: this.state.open, onTouchTap: this._onOverlayTouchTap });

    return (
      React.createElement("div", { className: classes },

        overlay,
        React.createElement(Paper, {
          ref: "clickAwayableElement",
          className: "mui-left-nav-menu",
          zDepth: 2,
          rounded: false },

          this.props.header,
          React.createElement(Menu, {
            ref: "menuItems",
            zDepth: 0,
            menuItems: this.props.menuItems,
            selectedIndex: selectedIndex,
            onItemClick: this._onMenuItemClick })

        )
      )
    );
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.props.selectedIndex !== key) {
      this.props.onChange(e, key, payload);
    }
    if (!this.props.docked) this.close();
  },

  _onOverlayTouchTap: function() {
    this.close();
  },

  _onWindowKeyUp: function(e) {
    if (e.keyCode == KeyCode.ESC &&
        !this.props.docked &&
        this.state.open) {
      this.close();
    }
  }

});

module.exports = LeftNav;