
/*global fetch*/

'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    mui = require( 'material-ui' ),
    BaseComponent = require( './Base.component' );

require( 'isomorphic-fetch' );

var TaskBreakdown = React.createClass( {

    mixins: [ BaseComponent ],

    render: function() {

        return (
            <Title title='react-isomorphic - Task breakdown'>
                <div className='task-breakdown'>

                    <h2>Task Breakdown</h2>
                    <p>Each of the tasks have documentation at the top of their source files and list any potential command-line arguments they can take. Below is a short description of each available task.</p>

                    <h5><code>npm run dev</code></h5>
                    <p>A watch method that will look for changes to source files, then re-trigger compilation and refresh updated files. The server will run on port 8080 and the Webpack-dev-server (with the hot-reload functionality) will run on server 1337.</p>
                    <p><code>node-sass</code>, <code>node-watch</code> and autoprefixer will also run (using <code>node sass-script</code>) in order to compile the scss files to css into the <code>build/css</code> folder.</p>

                    <h5><code>npm run build</code></h5>
                    <p>Convenience method that will ensure style sheets and javascript are compiled. After this, all assets are moved over to the <code>build</code> folder.</p>

                    <h5><code>npm run test-build</code></h5>
                    <p>Will launch a node server on port 8080 so we can test the build.</p>

                </div>
            </Title>
        );
    }

} );

module.exports = TaskBreakdown;
