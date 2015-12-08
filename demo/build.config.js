({
    'baseUrl': './',

    'name': 'src/index',
    'out': 'main-built.js',

    'paths': {
        'babel': '../babel-5.8.34.min',
        'es6': '../es6'
    },

    'config': {
        'es6': {
            'resolveModuleSource': function(source) {
                return 'es6!'+source;
            }
        }
    },

    'exclude': ['babel'],

    'optimize': 'none',

    'pragmasOnSave': {
        'excludeBabel': true
    }
})
