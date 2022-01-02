define([
//>>excludeStart('excludeBabel', pragmas.excludeBabel)
    'babel', 'babel-plugin-module-resolver',
    'module'
//>>excludeEnd('excludeBabel')
], function(
//>>excludeStart('excludeBabel', pragmas.excludeBabel)
    babel, moduleResolver,
    _module
//>>excludeEnd('excludeBabel')
    ) {
//>>excludeStart('excludeBabel', pragmas.excludeBabel)
        var fetchText, _buildMap = {};

        // Initialise the fetchText variable with a function to download
        // from a URL or to read from the file system.
        if (typeof window !== 'undefined' && window.navigator && window.document) {
            fetchText = function (url, callback) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onreadystatechange = function (evt) {
                    //Do not explicitly handle errors, those should be
                    //visible via console output in the browser.
                    if (xhr.readyState === 4) {
                        callback(xhr.responseText);
                    }
                };
                xhr.send(null);
            };
        } else {
            //Using special require.nodeRequire, something added by r.js.
            var fs = require.nodeRequire('fs');
            fetchText = function (path, callback) {
                callback(fs.readFileSync(path, 'utf8'));
            };
        }

        // Detects a call to define, require or require.config functions.
        function isDefineOrRequireOrRequireConfig(path) {
            var expr, callee, args, arg;

            if (!path.isExpressionStatement()) return false;

            expr = path.get("expression");
            if (!expr.isCallExpression()) return false;

            args = expr.get("arguments");
            if (args.length === 0) return false;

            callee = expr.get("callee");
            // define('name', [deps], factory)
            if (callee.isIdentifier({ name: "define" })) {
            arg = args.shift();
            if (arg.isStringLiteral()) {
                if (args.length === 0) return false;
                arg = args.shift();
            }
            if (arg.isArrayExpression()) {
                arg = args.shift();
                return arg.isFunctionExpression() || arg.isObjectExpression();
            }
            return arg.isFunctionExpression() || arg.isObjectExpression();
            }
            // require([deps], success, error)
            if (callee.isIdentifier({ name: "require" })) {
            arg = args.shift();
            if (!arg.isArrayExpression() || args.length === 0) return false;
            arg = args.shift();
            return arg.isFunctionExpression();
            }
            // require.config(object)
            return callee.isMemberExpression() &&
            callee.get('object').isIdentifier({ name: "require" }) &&
            callee.get('property').isIdentifier({ name: "config" });
        }

        // Thrown to abort the transpilation of an already AMD module.
        function AmdDetected() {}
        AmdDetected.prototype = Object.create(Error.prototype)

        // Throws if the module is an AMD module, otherwise does nothing.
        function checkAmd(path) {
            var body = path.get('body');
            var length = body.length;
            var i, node;
            for (i = 0; i < length; ++i) {
            node = body[i];
            // If import or export is detected, transform right away.
            if (node.isImportDeclaration() ||
                node.isExportDeclaration()) break;
            // If define or require is detected, abort right away.
            if (isDefineOrRequireOrRequireConfig(node)) {
                throw new AmdDetected();
            }
            }
        }

        // Throws if the module is an AMD module, otherwise does nothing.
        function amdChecker() {
            return {
            visitor: {
                Program: { enter: checkAmd }
            }
            };
        }

        babel.registerPlugin('amd-checker', amdChecker);
        babel.registerPlugin('module-resolver', moduleResolver);

        function resolvePath (sourcePath) {
            if (sourcePath.indexOf('!') < 0) {
                return 'es6!' + sourcePath;
            }
        }
        var excludedOptions = ['extraPlugins', 'resolveModuleSource'];
        var pluginOptions = _module.config();
        var fileExtension = pluginOptions.fileExtension || '.js';
        var defaultOptions = {
            plugins: (pluginOptions.extraPlugins || []).concat([
                'amd-checker',
                'transform-modules-amd',
                [
                    'module-resolver',
                    {
                        resolvePath: pluginOptions.resolveModuleSource || resolvePath
                    }
                ]
            ])
        };
        for (var key in pluginOptions) {
            if (pluginOptions.hasOwnProperty(key) && excludedOptions.indexOf(key) < 0) {
                defaultOptions[key] = pluginOptions[key];
            }
        }

//>>excludeEnd('excludeBabel')
return {
//>>excludeStart('excludeBabel', pragmas.excludeBabel)
        load: function (name, req, onload, config) {
            var sourceFileName = name + fileExtension;
            var url = req.toUrl(sourceFileName);

            if (url.indexOf('empty:') === 0) {
                return onload();
            }

            var options = {};
            for (var key in defaultOptions) {
                options[key] = defaultOptions[key];
            }
            options.sourceFileName = sourceFileName;
            options.sourceMap = config.isBuild ? false : 'inline';

            fetchText(url, function (text) {
                var code;
                try {
                    code = babel.transform(text, options).code;
                } catch (error) {
                    if (!(error instanceof AmdDetected)) {
                        return onload.error(error);
                    }
                    code = text;
                }

                if (config.isBuild) {
                    _buildMap[name] = code;
                }

                onload.fromText(code); 
            });
        },

        write: function (pluginName, moduleName, write) {
            if (moduleName in _buildMap) {
                write.asModule(pluginName + '!' + moduleName, _buildMap[moduleName]);
            }
        }
//>>excludeEnd('excludeBabel')
    };
});
