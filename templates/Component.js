
/*global fetch*/

"use strict";

var React = require('react'),
    Title = require('react-document-title'),
    Link = require('react-router').Link,
    mui = require('material-ui'),
    BaseComponent = require('./Base.component'),
    AppCanvas = mui.AppCanvas,
    RaisedButton = mui.RaisedButton;

require('isomorphic-fetch');



var Component = React.createClass({

    mixins: [BaseComponent],
    render: function() {
        return (
            <Title title='Component'>
                <div className='component'>
                </div>
            </Title>
        );
    }

});


module.exports = Component;
