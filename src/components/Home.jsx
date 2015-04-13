
/*global fetch*/

'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    mui = require( 'material-ui' ),
    BaseComponent = require( './Base.component' ),
    AppCanvas = mui.AppCanvas,
    RaisedButton = mui.RaisedButton;

require( 'isomorphic-fetch' );

var Home = React.createClass( {

    mixins: [ BaseComponent ],
    render: function() {
        return (
            <Title title='react-isomorphic - Home'>
                <div className='home'>
                    <h2>Introduction</h2>
                    <p>The intention of this skeleton is to give a base platform for you to build an isomorphic JS website using SASS or LESS styling unlike main of the other React skeleton which are using JS to style components (which may not be handy for everybody).</p>
                    <p>All build tools are supplied through Node and uses Webpack as a module bundler.</p>
                    <p>It is a collection of build tools, configuration files, folder structures and more. Below are some of the features provided:</p>
                        <ul>
                            <li>Compile style sheets from SASS/LESS for every single view/component (inline critical styles into the rendered html page and add the non-critical styles at the end of the page).</li>
                            <li>Bundle uglify and inline JavaScript source files into payloads.</li>
                            <li>Watch source files and trigger compilation as required (for both JS and CSS).</li>
                        </ul>

                    <h2>Installation</h2>
                        <p className="code-container">
                            <code>git clone ssh://git@stash.rehabstudio.com:7999/~mickaelcoelho/isomorphic-js-skeleton.git<br/>
                            cd isomorphic-js-skeleton<br/>
                            sudo npm install</code>
                        </p>

                            <a href="http://facebook.github.io/react/" target="_blank">
                                <RaisedButton label="ReactJS" primary={true} />
                            </a>

                </div>
            </Title>
        );
    }

} );

module.exports = Home;
