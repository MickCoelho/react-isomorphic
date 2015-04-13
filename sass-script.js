var autoprefixer = require( 'autoprefixer' )( 'last 2 version' ),
    fs = require( 'fs' ),
    mkdirp = require( 'mkdirp' ),
    watch = require( 'node-watch' ),
    sass = require( 'node-sass' ),
    clc = require( 'cli-color' ),
    CleanCSS = require( 'clean-css' );

require( "time-require" );

var inputPath = 'src/styles',
    outputPath = 'build/css/';

var computeSass = function( filename ) {
    console.log( filename, ' changed.' );

    //Adding in prefix
    updatedStyle = fs.readFileSync( filename );
    var prefixed = autoprefixer.process( updatedStyle ).css;

    //Compress the stylesheet and convert it to css
    var result = sass.renderSync( {
        includePaths: [
                    inputPath,
                    'node_modules',
                    'src/styles',
                    'src/styles/critical',
                    'src/styles/non-critical' ],
        data: prefixed,
        outputStyle: 'compressed'
    } );

    outputFilename = filename.replace( inputPath + '/', outputPath ).replace( '.scss', '.css' );

    // //Create the folder if doesn't exists
    outputFolder = outputFilename.substr( 0, outputFilename.lastIndexOf( "\/" ) );
    if ( !fs.existsSync( outputFolder ) ) {
        mkdirp( outputFolder, function( err ) {
            if ( err ) {
                console.error( err )
            }else {
                exportStylesheet( result, outputFilename, false );
            }
        } );
    }else {
        exportStylesheet( result, outputFilename, false );
    }
}

var exportStylesheet = function( result, outputFilename, minify ) {
    if ( minify ) {
        var minified = new CleanCSS().minify( result.css ).styles;
        fs.writeFileSync( outputFilename, minified, 'utf8' );
    }else {
        fs.writeFileSync( outputFilename, result.css, 'utf8' );
    }

    // // fs.writeFileSync(outputFilename + '.map', result.map, 'utf8');
    console.log( '     ' + outputFilename, ' generated.' );
}

var prefixed,
    updatedStyle,
    outputFilename,
    outputFolder;

var walk = function( dir, done ) {
    fs.readdir( dir, function( error, list ) {
        if ( error ) {
            return done( error );
        }
        var i = 0;
        ( function next() {
            var file = list[i++];
            if ( !file ) {
                return done( null );
            }
            file = dir + '/' + file;
            fs.stat( file, function( error, stat ) {
                if ( stat && stat.isDirectory() ) {
                    walk( file, function( error ) {
                        next();
                    } );
                } else {

                    //Filter to get only .scss files
                    if ( file.search( '.scss' ) > -1 ) {

                        //do not use _partials
                        if ( file.search( '/_' ) === -1 ) {
                            computeSass( file );
                        }
                    }
                    next();
                }
            } );
        } )();
    } );
};

//Go through the input folder and call computeSass for every single .scss file
//(exluding _partials)
console.log( clc.green( 'Compiling SASS from ' + inputPath ) );
walk( inputPath, function( error ) {
    if ( error ) {
        throw error;
    }
} );
if ( process.env.NODE_ENV === "development" ) {
    console.log( clc.green( "Watching directory '" + inputPath + "' for stylsheet changes." ) );

    //Watch for changes and call computeSass
    watch( inputPath + '/', function( filename ) {
        computeSass( filename );
    } );
}
