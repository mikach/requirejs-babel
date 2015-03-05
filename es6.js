var fetchText = function (url, callback) {
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

define(['babel'], function(babel) {
    return {
        load: function (name, req, onload, config) {
            var url = req.toUrl(name + '.js'),
                code;

            fetchText(url, function (text) {
                code = babel.transform(text, {
                    sourceMap: 'inline'
                }).code;
                onload.fromText(code);
            });
        }
    }
});