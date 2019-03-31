({
    'baseUrl': './',

    'name': 'src/index',
    'out': 'main-built.js',

    'paths': {
        'es6': '../es6',
        'babel': '../node_modules/@babel/standalone/babel.min',
        'babel-plugin-module-resolver': '../node_modules/babel-plugin-module-resolver-standalone/index'
    },

    'config': {
        'es6': {
            'extraPlugins': ['transform-async-to-generator', 'external-helpers'],
            'presets': ['es2015']
        }
    },

    'exclude': ['babel', 'babel-plugin-module-resolver'],

    'optimize': 'uglify2',
    'generateSourceMaps': true,
    'preserveLicenseComments': false,

    'pragmasOnSave': {
        'excludeBabel': true
    }
})
