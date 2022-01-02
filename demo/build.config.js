({
    'baseUrl': './',

    'name': 'src/index',
    'out': 'main-built.js',

    'paths': {
        'es6': '../es6',
        'babel': '../node_modules/@babel/standalone/babel.min',
        'babel-plugin-module-resolver': '../node_modules/babel-plugin-module-resolver-standalone/index',
        'lit-html': '../node_modules/lit-html/lit-html'
    },

    'exclude': ['babel', 'babel-plugin-module-resolver'],

    'optimize': 'none',

    'pragmasOnSave': {
        'excludeBabel': true
    }
})
