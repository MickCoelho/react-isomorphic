/*global fetch*/
'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    mui = require( 'material-ui' ),
    BaseComponent = require( './Base.component' );

var NotFound = React.createClass( {

    render: function( ) {
        return (
          <Title title='You lost mate'>
                    <div>
                        <h1>404 Not Found</h1>
                        <ul className="nav">
                            <li>
                                <Link to='Home'>Home</Link>
                            </li>
                        </ul>

                    </div>
                </Title>
        );
    }

} );

module.exports = NotFound;
