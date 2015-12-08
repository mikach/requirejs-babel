var fetchText, _buildMap = {};


define('es6',[
        'module'
], function(
        _module
    ) {
    return {
        load: function (name, req, onload, config) {
                    },

        write: function (pluginName, moduleName, write) {
            if (moduleName in _buildMap) {
                write.asModule(pluginName + '!' + moduleName, _buildMap[moduleName]);
            }
        }
    }
});


define('es6!src/sum',["exports", "module"], function (exports, module) {
  

  module.exports = function (a, b) {
    return a + b;
  };
});

define('es6!src/class',['exports', 'es6!src/sum'], function (exports, _es6SrcSum) {
    

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var _sum = _interopRequireDefault(_es6SrcSum);

    console.log((0, _sum['default'])(1, 2));

    var A = function A(a) {
        _classCallCheck(this, A);

        console.log('Hello ' + a);
    };

    new A('world!');
});
require(['es6!src/class']);
define("src/index", function(){});

