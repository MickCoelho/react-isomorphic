
/*global fetch*/

'use strict';

var React = require( 'react' ),
    Title = require( 'react-document-title' ),
    Link = require( 'react-router' ).Link,
    mui = require( 'material-ui' ),
    BaseComponent = require( './Base.component' );

require( 'isomorphic-fetch' );

var FolderStructure = React.createClass( {

    mixins: [ BaseComponent ],

    render: function() {

        return (
            <Title title='react-isomorphic - Folder structure'>
                <div className='folder-structure'>

                    <h2>Folder structure</h2>
                    <p>Tasks to run the projects are listed into <code>package.json</code>.</p>
                    <p>All the components/views are located in the <code>src/components</code> folder. These will be React class and will have to return the DOM (based on ReactJS best pratices) as they'll be used both by the server and the client. It's important to remember that, every time a component is created (and listed onto the <code>routes.js</code>), you'll have to create a relative critical and non-critical stylesheets into the right folders (please see below).</p>
                    <p>All the style sheets will be in the <code>src/styles</code> folder. That folder is then separated in two different folders <code>critical</code> and <code>non-critical</code>. Doesn't need to explain more what's inside I guess... In both of these folders, `App.css` files will be called when compiling the project, these will contain general styles (and can import which ever file you want).</p>
                    <p><code>actions</code> and <code>stores</code> folders have been created in case you want to implement Flux.</p>

                </div>
            </Title>
        );
    }

} );

module.exports = FolderStructure;
