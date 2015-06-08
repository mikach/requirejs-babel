Babel (6to5) Plugin
===

A [Babel](https://babeljs.io/) loader plugin for [RequireJS](http://requirejs.org).

Installation
---

```
  $ npm install -g bower
  $ bower install https://github.com/hipertracker/requirejs-babel
```

Usage
---

Add the paths to configuration:

```javascript
  paths: {
    es6: '...path_to_bower/requirejs-babel/es6',
    babel: '...path_to_bower/requirejs-babel/babel.min'
  }
```

Reference files via the es6! plugin name:
```javascript
  define(['es6!your-es6-module'], function(module) {
    // ...
  });
```
