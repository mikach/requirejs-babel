Babel Plugin
===

A [Babel](https://babeljs.io/) loader plugin for [RequireJS](http://requirejs.org).

Installation
---

```bash
npm install hipertracker/requirejs-babel
```

Usage
---

Add the paths and shim to configuration:

```javascript
    paths: {
        babel: 'vendor/requirejs-babel/browser',
        babel_polyfill: 'vendor/requirejs-babel/polyfill.min',
        es6: 'vendor/requirejs-babel/es6'
    },
    shim: {
        babel: {
            deps: ['babel_polyfill']
        }
```

Reference files via the `es6!` plugin name:

new ES6 syntax (better)
```javascript
import MyEs6Module from 'es6!./my-es6-module'
```
or plain old AMD syntax:

```javascript
  define(['es6!./my-es6-module'], function(MyEs6Module) {
    // ...
  });
```

```html
....
<script src="./requirejs-config.js"></script>
<script src="./vendor/requirejs/require.js" data-main="es6!./src/main" ></script>
```
