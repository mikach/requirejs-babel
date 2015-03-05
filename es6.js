var getXhr, fetchText, _buildMap = {};

if (typeof window !== "undefined" && window.navigator && window.document) {
    getXhr = function () {
        return new XMLHttpRequest();
    };

    fetchText = function (url, callback) {
        var xhr = getXhr();
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

} else if (typeof process !== "undefined" &&
           process.versions &&
           !!process.versions.node) {
    //Using special require.nodeRequire, something added by r.js.
    fs = require.nodeRequire('fs');
    fetchText = function (path, callback) {
        callback(fs.readFileSync(path, 'utf8'));
    };
}

define(['babel'], function(babel) {
    return {
        load: function (name, req, onload, config) {
            var url = req.toUrl(name + '.js'),
                code;

            fetchText(url, function (text) {
                code = babel.transform(text, {
                    sourceMap: 'inline'
                }).code;

                if (config.isBuild) {
                    _buildMap[name] = code;
                }

                onload.fromText(code);    
            });
        },

        write: function (pluginName, moduleName, write) {
            if (moduleName in _buildMap) {
                // var text = jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + '!' + moduleName, _buildMap[moduleName]);
            }
        }
    }
});
