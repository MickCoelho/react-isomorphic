'use strict';

var React = require( 'react' );
var Route = require( 'react-router' ).Route;
var NotFoundRoute = require( 'react-router' ).NotFoundRoute;
var DefaultRoute = require( 'react-router' ).DefaultRoute;

var App = require( './components/App' );
var Home = require( './components/Home' );
var PerformanceImprovements = require( './components/PerformanceImprovements' );
var NotFound = require( './components/NotFound' );
var FolderStructure = require( './components/Folder-structure' );
var TaskBreakdown = require( './components/Task-breakdown' );
var KnownIssues = require( './components/Known-issues' );

var Routes = (
    <Route handler={App}>
        <DefaultRoute name="Home" handler={Home}/>
        <Route name="Performance-improvements" path="/performance-improvements" handler={PerformanceImprovements}/>
        <Route name="Folder-structure" path="/folder-structure" handler={FolderStructure}/>
        <Route name="Task-breakdown" path="/task-breakdown" handler={TaskBreakdown}/>
        <Route name="Known-issues" path="/known-issues" handler={KnownIssues}/>
        <NotFoundRoute handler={NotFound}/>
    </Route>
);

module.exports = Routes;

