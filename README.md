Babel (6to5) Plugin
===

A [Babel](https://babeljs.io/) loader plugin for [RequireJS](http://requirejs.org).

Installation
---

```
  $ npm install -g bower
  $ bower install requirejs-babel
```

Usage
---

Add the paths to configuration:

```javascript
  paths: {
    es6: '...path_to_bower/requirejs-babel/es6',
    babel: '...path_to_bower/requirejs-babel/babel-5.8.22.min'
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
