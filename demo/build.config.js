({
    'baseUrl': './',

    'name': 'src/index',
    'out': 'main-built.js',

    'paths': {
        'babel': '../babel.min',
        'es6': '../es6'
    },

    'exclude': ['babel'],

    'optimize': 'none',

    'pragmasOnSave': {
        'excludeBabel': true
    }
})