# react-isomorphic


## Introduction
The intention of this skeleton is to give a base platform for you to build an isomorphic JS website using SASS or LESS styling unlike main of the other React skeleton which are using JS to style components (which may not be handy for everybody).
All build tools are supplied through Node and uses Webpack as a module bundler.

It is a collection of build tools, configuration files, folder structures and more. Below are some of the features provided:
- Compile style sheets from SASS/LESS for every single view/component (inline critical styles into the rendered html page and add the non-critical styles at the end of the page).
- Bundle uglify and inline JavaScript source files into payloads.
- Watch source files and trigger compilation as required (for both JS and CSS).
- Deploy your project to a nodeJS server.

A basic demo is available here http://iso-react.jit.su/


## Perfomance improvements
Performance improvements have been done, especially on DOM load content and styling. When the browser will hit a page, the server will dynamically render an html page, which will contain:
- Inlined critical styles.
- Inlined critical styles relative to the current route only based on the device type (mobile/tablet/desktop).
- The content of the page.
- JS for all the interaction and loading the other stylesheets.
When the JS will be executed, it'll:
- Remove the previously inlined styles.
- Add back all the critical/non-critical styles no matter the current device type (media queries will do the rest).
- Add all the interactions.
This has been done in order to prioritise content loading while respecting a specific performance budget.



## Installation
```
git clone ssh://git@github.com:MickCoelho/react-isomorphic.git
cd react-isomorphic
sudo npm install
```

## Folder structure
Tasks to run the projects are listed into `package.json`.
All the components/views are located in the `src/components` folder. These will be React class and will have to return the DOM (based on ReactJS best pratices) as they'll be used both by the server and the client. It's important to remember that, every time a component is created (and listed onto the `routes.js`), you'll have to create a relative critical and non-critical stylesheets into the right folders (please see below).
All the style sheets will be in the `src/styles` folder. That folder is then separated in two different folders `critical` and `non-critical`. Doesn't need to explain more what's inside I guess... In both of these folders, `App/main.css` files will be called when compiling the project, these will contain general styles (and can import which ever file you want).
`actions` and `stores` folders have been created in case you want to implement Flux.

## Task Breakdown
Each of the tasks have documentation at the top of their source files and list any potential command-line arguments they can take. Below is a short description of each available task.

### `npm run dev`
A watch method that will look for changes to source files, then re-trigger compilation and refresh updated files. The server will run on port 8080 and the Webpack-dev-server (with the hot-reload functionality) will run on server 1337.
node-sass, node-watch and autoprefixer will also run (using `node sass-script`) in order to compile the scss files to css into the `build/css` folder.

### `npm run build`
Convenience method that will ensure style sheets and javascript are compiled. After this, all assets are moved over to the `build` folder.

### `npm run test-build`
Will launch a node server on port 8080 so we can test the build


## Known issues
For every component created and added to the `routes.js`, the component will try to find hits own critical and non-critical stylesheets. For now, we'll have to create an empty file [my-component].scss file into 'styles/critical' and 'styles/non-critical' so Webpack won't throw an error.
Also, the name of these linked critical/non-critical stylesheets is (for now) the same as the `name` values which are in the `routes.js`. Plan being to specify the name of these stylesheets into the `routes.js` but separately.
Tasks still need to be created in order to optimise external assets (such as fonts, images...), tests also need to be implemented.

