
/*global fetch*/

'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    mui = require( 'material-ui' ),
    BaseComponent = require( './Base.component' );

require( 'isomorphic-fetch' );

var PerformanceImprovements = React.createClass( {

    mixins: [ BaseComponent ],

    render: function() {

        return (
            <Title title='react-isomorphic - Performance improvements'>
                <div className='performance-improvements'>

                    <h2>Performance improvements</h2>
                    <ul>
                        Performance improvements have been done, especially on DOM load content and styling. When the browser will hit a page, the server will dynamically render an html page, which will contain:
                        <li>Inlined critical styles.</li>
                        <li>Inlined critical styles relative to the current route only based on the device type (mobile/tablet/desktop).</li>
                        <li>The content of the page.</li>
                        <li>JS for all the interaction and loading the other stylesheets.</li>
                    </ul>
                    <ul>
                        When the JS will be executed, it'll:
                        <li>Remove the previously inlined styles.</li>
                        <li>Add back all the critical/non-critical styles no matter the current device type (media queries will do the rest).</li>
                        <li>Add all the interactions.</li>
                    </ul>
                    <p>This has been done in order to prioritise content loading while respecting a specific performance budget.</p>

                </div>
            </Title>
        );
    }

} );

module.exports = PerformanceImprovements;
