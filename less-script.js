var fs = require( 'fs' ),
    fse = require( 'fs-extra' ),
    mkdirp = require( 'mkdirp' ),
    watch = require( 'node-watch' ),
    less = require( 'less' ),
    LessPluginAutoPrefix = require( 'less-plugin-autoprefix' ),
    autoprefixPlugin = new LessPluginAutoPrefix( { browsers: [ "last 2 versions" ] } ),
    clc = require( 'cli-color' ),
    CleanCSS = require( 'clean-css' );

require( "time-require" );

var inputPath = 'src/styles/less',
    outputPath = 'build/css/',
    fontsInput = 'src/styles/less/fonts',
    fontsOutput = 'build/fonts';

var computeLess = function( filename ) {
    console.log( filename, ' changed.' );
    updatedStyle = fs.readFileSync( filename, "utf8" );
    var outputFilename = filename.replace( inputPath + '/', outputPath ).replace( '.less', '.css' );
    less.render( updatedStyle, {
            plugins: [ autoprefixPlugin ],
            paths: [ inputPath,
                'node_modules',
                'src/libs/material-ui/less/',
                'src/styles/',
                'src/styles/material-ui',
                'src/styles/critical',
                'src/styles/non-critical' ],
            filename: filename,

 // Specify a filename, for better error messages
            compress: true

          // Minify CSS output
        } )
            .then( function( output ) {

                //Create the folder if doesn't exists
                var outputFolder = outputFilename.substr( 0, outputFilename.lastIndexOf( "\/" ) );
                if ( !fs.existsSync( outputFolder ) ) {
                    mkdirp( outputFolder, function( err ) {
                        if ( err ) {
                            console.log( clc.red( 'LESS render: ' + err ) );
                        }else {
                            exportStylesheet( output, outputFilename, false );
                        }
                    } );
                    console.log( '     ' + outputFilename, ' generated.' );
                }else {
                    exportStylesheet( output, outputFilename, false );
                    console.log( '     ' + outputFilename, ' generated.' );
                }
            },
            function( error ) {
                console.log( clc.red( 'LESS render: ' + error ) );
            } );

}

var exportStylesheet = function( result, outputFilename, minify ) {
    if ( minify ) {
        var minified = new CleanCSS().minify( result.css ).styles;
        fs.writeFileSync( outputFilename, minified, 'utf8' );
    }else {
        fs.writeFileSync( outputFilename, result.css, 'utf8' );
    }
}

var prefixed,
    updatedStyle;

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

                    //Filter to get only .less files
                    if ( file.search( '.less' ) > -1 ) {

                        //do not use _partials
                        if ( file.search( '/_' ) === -1 ) {
                            computeLess( file );
                        }
                    }
                    next();
                }
            } );
        } )();
    } );
};

//Go through the input folder and call computeLess for every single .less file
//(exluding _partials)
console.log( clc.green( 'Compiling LESS from ' + inputPath ) );
walk( inputPath, function( error ) {
    if ( error ) {
        throw error;
    }
} );

//Copy font folder to the build

fse.copy( fontsInput, fontsOutput, function( err ) {
    if ( err ) {
        console.log( clc.red( 'Fonts copy: ' + err ) );
    } else {
        console.log( clc.green( "Copied fonts from " + fontsInput + " into " + fontsOutput )  );
    }
} );

if ( process.env.NODE_ENV === "development" ) {
    console.log( clc.green( "Watching directory '" + inputPath + "' for stylsheet changes." ) );

    //Watch for changes and call computeLess
    watch( inputPath + '/', function( filename ) {
        computeLess( filename );
    } );
}
