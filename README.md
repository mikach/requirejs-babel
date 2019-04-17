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
