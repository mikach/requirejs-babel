Babel (6to5) Plugin
===

A [Babel](https://babeljs.io/) loader plugin for [RequireJS](http://requirejs.org).

Installation
---

```sh
npm install --save-dev requirejs-babel babel babel-plugin-module-resolver-standalone
```

Usage
---

Add the paths to configuration:

```javascript
  paths: {
    es6: '...node_modules/requirejs-babel/es6',
    babel: '...node_modules/@babel/standalone/babel.min',
    'babel-plugin-module-resolver': '...node_modules/babel-plugin-module-resolver-standalone/index'
  }
```

Reference files via the es6! plugin name:
```javascript
  define(['es6!your-es6-module'], function(module) {
    // ...
  });
```

You could just have an es6 entry point, like this:
```
// This file, named /index.js, just points to /src/index.js to start the es6 app.
require(['es6!src/index']);
```
Then class can `import` any other plain es6 js file which uses the `export` syntax!

Your `src/index.js` file might be like
```
import a from 'a';
import b from 'b';
import c from 'c';
```
