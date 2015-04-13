
/*global fetch*/

'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    mui = require( 'material-ui' ),
    BaseComponent = require( './Base.component' );

require( 'isomorphic-fetch' );

var KnownIssues  = React.createClass( {

    mixins: [ BaseComponent ],

    render: function() {

        return (
            <Title title='react-isomorphic - Known issues'>
                <div className='known-issues'>

                    <h2>Known issues</h2>
                    <p>Ideally, critical inlined styles should be based on `deviceType`, so we only inline the correct styles. At the bottom of the page, the styles critical styles (relative to the other kind of devices) and non-critical ones would be loaded.</p>
                    <p>Need to implement autoprefixer.</p>
                    <p>For every component created and added to the `routes.js`, the component will try to find hits own critical and non-critical stylesheets. For now, we'll have to create an empty file [my-component].scss file into 'styles/critical' and 'styles/non-critical' so Webpack won't throw an error.</p>
                    <p>Also, the name of these linked critical/non-critical stylesheets is (for now) the same as the `name` values which are in the `routes.js`. Plan being to specify the name of these stylesheets into the `routes.js` but separately.</p>
                    <p>Tasks still need to be created in order to optimise external assets (such as fonts, images...), tests also need to be implemented.</p>

                </div>
            </Title>
        );
    }

} );

module.exports = KnownIssues;
