/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/handlebars/dist/cjs/handlebars.runtime.js":
/*!****************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars.runtime.js ***!
  \****************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }
    newObj['default'] = obj;
    return newObj;
  }
}
var _handlebarsBase = __webpack_require__(/*! ./handlebars/base */ "./node_modules/handlebars/dist/cjs/handlebars/base.js");
var base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

var _handlebarsSafeString = __webpack_require__(/*! ./handlebars/safe-string */ "./node_modules/handlebars/dist/cjs/handlebars/safe-string.js");
var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
var _handlebarsException = __webpack_require__(/*! ./handlebars/exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");
var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
var _handlebarsUtils = __webpack_require__(/*! ./handlebars/utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");
var Utils = _interopRequireWildcard(_handlebarsUtils);
var _handlebarsRuntime = __webpack_require__(/*! ./handlebars/runtime */ "./node_modules/handlebars/dist/cjs/handlebars/runtime.js");
var runtime = _interopRequireWildcard(_handlebarsRuntime);
var _handlebarsNoConflict = __webpack_require__(/*! ./handlebars/no-conflict */ "./node_modules/handlebars/dist/cjs/handlebars/no-conflict.js");
var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  var hb = new base.HandlebarsEnvironment();
  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;
  hb.VM = runtime;
  hb.template = function (spec) {
    return runtime.template(spec, hb);
  };
  return hb;
}
var inst = create();
inst.create = create;
_handlebarsNoConflict2['default'](inst);
inst['default'] = inst;
exports["default"] = inst;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/base.js":
/*!*************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/base.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _utils = __webpack_require__(/*! ./utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");
var _exception = __webpack_require__(/*! ./exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");
var _exception2 = _interopRequireDefault(_exception);
var _helpers = __webpack_require__(/*! ./helpers */ "./node_modules/handlebars/dist/cjs/handlebars/helpers.js");
var _decorators = __webpack_require__(/*! ./decorators */ "./node_modules/handlebars/dist/cjs/handlebars/decorators.js");
var _logger = __webpack_require__(/*! ./logger */ "./node_modules/handlebars/dist/cjs/handlebars/logger.js");
var _logger2 = _interopRequireDefault(_logger);
var _internalProtoAccess = __webpack_require__(/*! ./internal/proto-access */ "./node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js");
var VERSION = '4.7.8';
exports.VERSION = VERSION;
var COMPILER_REVISION = 8;
exports.COMPILER_REVISION = COMPILER_REVISION;
var LAST_COMPATIBLE_COMPILER_REVISION = 7;
exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
var REVISION_CHANGES = {
  1: '<= 1.0.rc.2',
  // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0 <4.3.0',
  8: '>= 4.3.0'
};
exports.REVISION_CHANGES = REVISION_CHANGES;
var objectType = '[object Object]';
function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};
  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}
HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,
  logger: _logger2['default'],
  log: _logger2['default'].log,
  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },
  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },
  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  },
  /**
   * Reset the memory of illegal property accesses that have already been logged.
   * @deprecated should only be used in handlebars test-cases
   */
  resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
    _internalProtoAccess.resetLoggedProperties();
  }
};
var log = _logger2['default'].log;
exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/decorators.js":
/*!*******************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/decorators.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _decoratorsInline = __webpack_require__(/*! ./decorators/inline */ "./node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js");
var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js":
/*!**************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js ***!
  \**************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");
exports["default"] = function (instance) {
  instance.registerDecorator('inline', function (fn, props, container, options) {
    var ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function (context, options) {
        // Create a new partials stack frame prior to exec.
        var original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        var ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }
    props.partials[options.args[0]] = options.fn;
    return ret;
  });
};
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/exception.js":
/*!******************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/exception.js ***!
  \******************************************************************/
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
var errorProps = ['description', 'fileName', 'lineNumber', 'endLineNumber', 'message', 'name', 'number', 'stack'];
function Exception(message, node) {
  var loc = node && node.loc,
    line = undefined,
    endLineNumber = undefined,
    column = undefined,
    endColumn = undefined;
  if (loc) {
    line = loc.start.line;
    endLineNumber = loc.end.line;
    column = loc.start.column;
    endColumn = loc.end.column;
    message += ' - ' + line + ':' + column;
  }
  var tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }
  try {
    if (loc) {
      this.lineNumber = line;
      this.endLineNumber = endLineNumber;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true
        });
        Object.defineProperty(this, 'endColumn', {
          value: endColumn,
          enumerable: true
        });
      } else {
        this.column = column;
        this.endColumn = endColumn;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}
Exception.prototype = new Error();
exports["default"] = Exception;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers.js":
/*!****************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
exports.moveHelperToHooks = moveHelperToHooks;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _helpersBlockHelperMissing = __webpack_require__(/*! ./helpers/block-helper-missing */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js");
var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
var _helpersEach = __webpack_require__(/*! ./helpers/each */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/each.js");
var _helpersEach2 = _interopRequireDefault(_helpersEach);
var _helpersHelperMissing = __webpack_require__(/*! ./helpers/helper-missing */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js");
var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
var _helpersIf = __webpack_require__(/*! ./helpers/if */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/if.js");
var _helpersIf2 = _interopRequireDefault(_helpersIf);
var _helpersLog = __webpack_require__(/*! ./helpers/log */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/log.js");
var _helpersLog2 = _interopRequireDefault(_helpersLog);
var _helpersLookup = __webpack_require__(/*! ./helpers/lookup */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js");
var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
var _helpersWith = __webpack_require__(/*! ./helpers/with */ "./node_modules/handlebars/dist/cjs/handlebars/helpers/with.js");
var _helpersWith2 = _interopRequireDefault(_helpersWith);
function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}
function moveHelperToHooks(instance, helperName, keepHelper) {
  if (instance.helpers[helperName]) {
    instance.hooks[helperName] = instance.helpers[helperName];
    if (!keepHelper) {
      delete instance.helpers[helperName];
    }
  }
}

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js ***!
  \*************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");
exports["default"] = function (instance) {
  instance.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse,
      fn = options.fn;
    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }
        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        var data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = {
          data: data
        };
      }
      return fn(context, options);
    }
  });
};
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/each.js":
/*!*********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/each.js ***!
  \*********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");
var _exception = __webpack_require__(/*! ../exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");
var _exception2 = _interopRequireDefault(_exception);
exports["default"] = function (instance) {
  instance.registerHelper('each', function (context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }
    var fn = options.fn,
      inverse = options.inverse,
      i = 0,
      ret = '',
      data = undefined,
      contextPath = undefined;
    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }
    if (options.data) {
      data = _utils.createFrame(options.data);
    }
    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;
        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }
      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
      });
    }
    if (context && typeof context === 'object') {
      if (_utils.isArray(context)) {
        for (var j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else if (typeof Symbol === 'function' && context[Symbol.iterator]) {
        var newContext = [];
        var iterator = context[Symbol.iterator]();
        for (var it = iterator.next(); !it.done; it = iterator.next()) {
          newContext.push(it.value);
        }
        context = newContext;
        for (var j = context.length; i < j; i++) {
          execIteration(i, i, i === context.length - 1);
        }
      } else {
        (function () {
          var priorKey = undefined;
          Object.keys(context).forEach(function (key) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          });
          if (priorKey !== undefined) {
            execIteration(priorKey, i - 1, true);
          }
        })();
      }
    }
    if (i === 0) {
      ret = inverse(this);
    }
    return ret;
  });
};
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js ***!
  \*******************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _exception = __webpack_require__(/*! ../exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");
var _exception2 = _interopRequireDefault(_exception);
exports["default"] = function (instance) {
  instance.registerHelper('helperMissing', function () /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/if.js":
/*!*******************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/if.js ***!
  \*******************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");
var _exception = __webpack_require__(/*! ../exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");
var _exception2 = _interopRequireDefault(_exception);
exports["default"] = function (instance) {
  instance.registerHelper('if', function (conditional, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#if requires exactly one argument');
    }
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });
  instance.registerHelper('unless', function (conditional, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#unless requires exactly one argument');
    }
    return instance.helpers['if'].call(this, conditional, {
      fn: options.inverse,
      inverse: options.fn,
      hash: options.hash
    });
  });
};
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/log.js":
/*!********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/log.js ***!
  \********************************************************************/
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = function (instance) {
  instance.registerHelper('log', function () /* message, options */{
    var args = [undefined],
      options = arguments[arguments.length - 1];
    for (var i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }
    var level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;
    instance.log.apply(instance, args);
  });
};
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js":
/*!***********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js ***!
  \***********************************************************************/
/***/ ((module, exports) => {

"use strict";


exports.__esModule = true;
exports["default"] = function (instance) {
  instance.registerHelper('lookup', function (obj, field, options) {
    if (!obj) {
      // Note for 5.0: Change to "obj == null" in 5.0
      return obj;
    }
    return options.lookupProperty(obj, field);
  });
};
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/helpers/with.js":
/*!*********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/helpers/with.js ***!
  \*********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");
var _exception = __webpack_require__(/*! ../exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");
var _exception2 = _interopRequireDefault(_exception);
exports["default"] = function (instance) {
  instance.registerHelper('with', function (context, options) {
    if (arguments.length != 2) {
      throw new _exception2['default']('#with requires exactly one argument');
    }
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }
    var fn = options.fn;
    if (!_utils.isEmpty(context)) {
      var data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }
      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath])
      });
    } else {
      return options.inverse(this);
    }
  });
};
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.createNewLookupObject = createNewLookupObject;
var _utils = __webpack_require__(/*! ../utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");

/**
 * Create a new object with "null"-prototype to avoid truthy results on prototype properties.
 * The resulting object can be used with "object[property]" to check if a property exists
 * @param {...object} sources a varargs parameter of source objects that will be merged
 * @returns {object}
 */

function createNewLookupObject() {
  for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }
  return _utils.extend.apply(undefined, [Object.create(null)].concat(sources));
}

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js":
/*!******************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.createProtoAccessControl = createProtoAccessControl;
exports.resultIsAllowed = resultIsAllowed;
exports.resetLoggedProperties = resetLoggedProperties;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}
var _createNewLookupObject = __webpack_require__(/*! ./create-new-lookup-object */ "./node_modules/handlebars/dist/cjs/handlebars/internal/create-new-lookup-object.js");
var _logger = __webpack_require__(/*! ../logger */ "./node_modules/handlebars/dist/cjs/handlebars/logger.js");
var _logger2 = _interopRequireDefault(_logger);
var loggedProperties = Object.create(null);
function createProtoAccessControl(runtimeOptions) {
  var defaultMethodWhiteList = Object.create(null);
  defaultMethodWhiteList['constructor'] = false;
  defaultMethodWhiteList['__defineGetter__'] = false;
  defaultMethodWhiteList['__defineSetter__'] = false;
  defaultMethodWhiteList['__lookupGetter__'] = false;
  var defaultPropertyWhiteList = Object.create(null);
  // eslint-disable-next-line no-proto
  defaultPropertyWhiteList['__proto__'] = false;
  return {
    properties: {
      whitelist: _createNewLookupObject.createNewLookupObject(defaultPropertyWhiteList, runtimeOptions.allowedProtoProperties),
      defaultValue: runtimeOptions.allowProtoPropertiesByDefault
    },
    methods: {
      whitelist: _createNewLookupObject.createNewLookupObject(defaultMethodWhiteList, runtimeOptions.allowedProtoMethods),
      defaultValue: runtimeOptions.allowProtoMethodsByDefault
    }
  };
}
function resultIsAllowed(result, protoAccessControl, propertyName) {
  if (typeof result === 'function') {
    return checkWhiteList(protoAccessControl.methods, propertyName);
  } else {
    return checkWhiteList(protoAccessControl.properties, propertyName);
  }
}
function checkWhiteList(protoAccessControlForType, propertyName) {
  if (protoAccessControlForType.whitelist[propertyName] !== undefined) {
    return protoAccessControlForType.whitelist[propertyName] === true;
  }
  if (protoAccessControlForType.defaultValue !== undefined) {
    return protoAccessControlForType.defaultValue;
  }
  logUnexpecedPropertyAccessOnce(propertyName);
  return false;
}
function logUnexpecedPropertyAccessOnce(propertyName) {
  if (loggedProperties[propertyName] !== true) {
    loggedProperties[propertyName] = true;
    _logger2['default'].log('error', 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\n' + 'You can add a runtime option to disable the check or this warning:\n' + 'See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
  }
}
function resetLoggedProperties() {
  Object.keys(loggedProperties).forEach(function (propertyName) {
    delete loggedProperties[propertyName];
  });
}

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js":
/*!****************************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.wrapHelper = wrapHelper;
function wrapHelper(helper, transformOptionsFn) {
  if (typeof helper !== 'function') {
    // This should not happen, but apparently it does in https://github.com/wycats/handlebars.js/issues/1639
    // We try to make the wrapper least-invasive by not wrapping it, if the helper is not a function.
    return helper;
  }
  var wrapper = function wrapper() /* dynamic arguments */{
    var options = arguments[arguments.length - 1];
    arguments[arguments.length - 1] = transformOptionsFn(options);
    return helper.apply(this, arguments);
  };
  return wrapper;
}

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/logger.js":
/*!***************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/logger.js ***!
  \***************************************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
var _utils = __webpack_require__(/*! ./utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");
var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',
  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }
    return level;
  },
  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);
    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      var method = logger.methodMap[level];
      // eslint-disable-next-line no-console
      if (!console[method]) {
        method = 'log';
      }
      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }
      console[method].apply(console, message); // eslint-disable-line no-console
    }
  }
};
exports["default"] = logger;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/no-conflict.js":
/*!********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/no-conflict.js ***!
  \********************************************************************/
/***/ ((module, exports) => {

"use strict";
/* global globalThis */


exports.__esModule = true;
exports["default"] = function (Handlebars) {
  /* istanbul ignore next */
  // https://mathiasbynens.be/notes/globalthis
  (function () {
    if (typeof globalThis === 'object') return;
    Object.prototype.__defineGetter__('__magic__', function () {
      return this;
    });
    __magic__.globalThis = __magic__; // eslint-disable-line no-undef
    delete Object.prototype.__magic__;
  })();
  var $Handlebars = globalThis.Handlebars;

  /* istanbul ignore next */
  Handlebars.noConflict = function () {
    if (globalThis.Handlebars === Handlebars) {
      globalThis.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/runtime.js":
/*!****************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/runtime.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    'default': obj
  };
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }
    newObj['default'] = obj;
    return newObj;
  }
}
var _utils = __webpack_require__(/*! ./utils */ "./node_modules/handlebars/dist/cjs/handlebars/utils.js");
var Utils = _interopRequireWildcard(_utils);
var _exception = __webpack_require__(/*! ./exception */ "./node_modules/handlebars/dist/cjs/handlebars/exception.js");
var _exception2 = _interopRequireDefault(_exception);
var _base = __webpack_require__(/*! ./base */ "./node_modules/handlebars/dist/cjs/handlebars/base.js");
var _helpers = __webpack_require__(/*! ./helpers */ "./node_modules/handlebars/dist/cjs/handlebars/helpers.js");
var _internalWrapHelper = __webpack_require__(/*! ./internal/wrapHelper */ "./node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js");
var _internalProtoAccess = __webpack_require__(/*! ./internal/proto-access */ "./node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js");
function checkRevision(compilerInfo) {
  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
    currentRevision = _base.COMPILER_REVISION;
  if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
    return;
  }
  if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
    var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
      compilerVersions = _base.REVISION_CHANGES[compilerRevision];
    throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
  } else {
    // Use the embedded version info since the runtime doesn't know about this revision yet
    throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
  }
}
function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
  }
  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as pseudo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  // backwards compatibility for precompiled templates with compiler-version 7 (<4.3.0)
  var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }
    partial = env.VM.resolvePartial.call(this, partial, context, options);
    var extendedOptions = Utils.extend({}, options, {
      hooks: this.hooks,
      protoAccessControl: this.protoAccessControl
    });
    var result = env.VM.invokePartial.call(this, partial, context, extendedOptions);
    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, extendedOptions);
    }
    if (result != null) {
      if (options.indent) {
        var lines = result.split('\n');
        for (var i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }
          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  var container = {
    strict: function strict(obj, name, loc) {
      if (!obj || !(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj, {
          loc: loc
        });
      }
      return container.lookupProperty(obj, name);
    },
    lookupProperty: function lookupProperty(parent, propertyName) {
      var result = parent[propertyName];
      if (result == null) {
        return result;
      }
      if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return result;
      }
      if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
        return result;
      }
      return undefined;
    },
    lookup: function lookup(depths, name) {
      var len = depths.length;
      for (var i = 0; i < len; i++) {
        var result = depths[i] && container.lookupProperty(depths[i], name);
        if (result != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },
    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,
    fn: function fn(i) {
      var ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },
    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      var programWrapper = this.programs[i],
        fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },
    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    mergeIfNeeded: function mergeIfNeeded(param, common) {
      var obj = param || common;
      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }
      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),
    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler
  };
  function ret(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var data = options.data;
    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    var depths = undefined,
      blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }
    function main(context /*, options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;
  ret._setup = function (options) {
    if (!options.partial) {
      var mergedHelpers = Utils.extend({}, env.helpers, options.helpers);
      wrapHelpersToPassLookupProperty(mergedHelpers, container);
      container.helpers = mergedHelpers;
      if (templateSpec.usePartial) {
        // Use mergeIfNeeded here to prevent compiling global partials multiple times
        container.partials = container.mergeIfNeeded(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = Utils.extend({}, env.decorators, options.decorators);
      }
      container.hooks = {};
      container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
      var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
      _helpers.moveHelperToHooks(container, 'helperMissing', keepHelperInHelpers);
      _helpers.moveHelperToHooks(container, 'blockHelperMissing', keepHelperInHelpers);
    } else {
      container.protoAccessControl = options.protoAccessControl; // internal option
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
      container.hooks = options.hooks;
    }
  };
  ret._child = function (i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }
    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}
function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }
    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }
  prog = executeDecorators(fn, prog, container, depths, data, blockParams);
  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

/**
 * This is currently part of the official API, therefore implementation details should not be changed.
 */

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}
function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  var currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }
  var partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function () {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      var fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }
  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }
  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}
function noop() {
  return '';
}
function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}
function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    var props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}
function wrapHelpersToPassLookupProperty(mergedHelpers, container) {
  Object.keys(mergedHelpers).forEach(function (helperName) {
    var helper = mergedHelpers[helperName];
    mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
  });
}
function passLookupPropertyOption(helper, container) {
  var lookupProperty = container.lookupProperty;
  return _internalWrapHelper.wrapHelper(helper, function (options) {
    return Utils.extend({
      lookupProperty: lookupProperty
    }, options);
  });
}

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/safe-string.js":
/*!********************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/safe-string.js ***!
  \********************************************************************/
/***/ ((module, exports) => {

"use strict";
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}
SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
  return '' + this.string;
};
exports["default"] = SafeString;
module.exports = exports['default'];

/***/ }),

/***/ "./node_modules/handlebars/dist/cjs/handlebars/utils.js":
/*!**************************************************************!*\
  !*** ./node_modules/handlebars/dist/cjs/handlebars/utils.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
var badChars = /[&<>"'`=]/g,
  possible = /[&<>"'`=]/;
function escapeChar(chr) {
  return escape[chr];
}
function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }
  return obj;
}
var toString = Object.prototype.toString;
exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function (value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function (value) {
  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
};
exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}
function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }
  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}
function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}
function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}
function blockParams(params, ids) {
  params.path = ids;
  return params;
}
function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

/***/ }),

/***/ "./node_modules/handlebars/runtime.js":
/*!********************************************!*\
  !*** ./node_modules/handlebars/runtime.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(/*! ./dist/cjs/handlebars.runtime */ "./node_modules/handlebars/dist/cjs/handlebars.runtime.js")["default"];

/***/ }),

/***/ "./src/api/actors.js":
/*!***************************!*\
  !*** ./src/api/actors.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getActorData: () => (/* binding */ getActorData)
/* harmony export */ });
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch.js */ "./src/api/fetch.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


/**
 * Запрос на получение данных об актере
 * @function
 * @param {string} actorId - Идентификатор актёра.
 * @return {Promise} promise - Объект запроса
 */
function getActorData(_x) {
  return _getActorData.apply(this, arguments);
}
function _getActorData() {
  _getActorData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(actorId) {
    var response, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)("".concat(_fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP, "/actors/").concat(actorId, "/data"), 'GET');
        case 3:
          response = _context.sent;
          _context.next = 6;
          return response.json();
        case 6:
          data = _context.sent;
          if (!(!data || _typeof(data) !== 'object')) {
            _context.next = 9;
            break;
          }
          throw new Error('Ошибка: полученные данные не являются объектом');
        case 9:
          return _context.abrupt("return", data.actor);
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Произошла ошибка:', _context.t0.message);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _getActorData.apply(this, arguments);
}

/***/ }),

/***/ "./src/api/auth.js":
/*!*************************!*\
  !*** ./src/api/auth.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   check: () => (/* binding */ check),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   signup: () => (/* binding */ signup)
/* harmony export */ });
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch.js */ "./src/api/fetch.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


/**
 * проверка валидности сессии
 * @function
 * @return {Promise}
 */
function check() {
  return _check.apply(this, arguments);
}

/**
 * отправка запроса на вход
 * @function
 * @param {Object} user - данные пользователя
 * @return {Promise}
 */
function _check() {
  _check = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var response, responseData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)(_fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP + '/auth/check', 'POST');
        case 3:
          response = _context.sent;
          _context.next = 6;
          return response.json();
        case 6:
          responseData = _context.sent;
          return _context.abrupt("return", responseData.status === 200);
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Произошла ошибка в check:', _context.t0.message);
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return _check.apply(this, arguments);
}
function login(_x) {
  return _login.apply(this, arguments);
}

/**
 * отправка запроса на регистрацию
 * @function
 * @param {Object} user - данные пользователя
 * @return {Promise}
 */
function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(user) {
    var url, response, responseData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          url = _fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP + '/auth/login';
          _context2.next = 4;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)(url, 'POST', user);
        case 4:
          response = _context2.sent;
          _context2.next = 7;
          return response.json();
        case 7:
          responseData = _context2.sent;
          return _context2.abrupt("return", responseData.status === 200);
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error('Произошла ошибка в login:', _context2.t0.message);
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 11]]);
  }));
  return _login.apply(this, arguments);
}
function signup(_x2) {
  return _signup.apply(this, arguments);
}

/**
 * отправка запроса для удаления текущей сессии
 * @function
 * @return {Promise}
 */
function _signup() {
  _signup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(user) {
    var url, response, responseData;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          url = _fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP + '/auth/signup';
          _context3.next = 4;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)(url, 'POST', user);
        case 4:
          response = _context3.sent;
          _context3.next = 7;
          return response.json();
        case 7:
          responseData = _context3.sent;
          return _context3.abrupt("return", responseData.status < 300);
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.error('Произошла ошибка в signup:', _context3.t0.message);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return _signup.apply(this, arguments);
}
function logout() {
  return _logout.apply(this, arguments);
}
function _logout() {
  _logout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var url, response, responseData;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          url = _fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP + '/auth/logout';
          _context4.next = 4;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)(url, 'POST');
        case 4:
          response = _context4.sent;
          _context4.next = 7;
          return response.json();
        case 7:
          responseData = _context4.sent;
          return _context4.abrupt("return", responseData.status === 200);
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error('Произошла ошибка в logout:', _context4.t0.message);
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return _logout.apply(this, arguments);
}

/***/ }),

/***/ "./src/api/fetch.js":
/*!**************************!*\
  !*** ./src/api/fetch.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IP: () => (/* binding */ IP),
/* harmony export */   fetchRequest: () => (/* binding */ fetchRequest)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var IP = "http://127.0.0.1:8081";

/**
 * @function
 * @param {string} url - URL запроса
 * @param {string} method - метод запроса
 * @param {Object} body - тело запроса (при наличии)
 * @param {Object} headers - Заголовки запроса (при наличии)
 * @return {Promise} promise - Объект запроса
 */
var fetchRequest = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
    var method,
      body,
      headers,
      options,
      response,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          method = _args.length > 1 && _args[1] !== undefined ? _args[1] : "GET";
          body = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
          headers = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
          _context.prev = 3;
          options = {
            method: method,
            headers: _objectSpread({
              "Content-Type": "multipart/form-data"
            }, headers),
            credentials: "include"
          };
          if (body !== null) {
            options.body = JSON.stringify(body);
          }
          _context.next = 8;
          return fetch(url, options);
        case 8:
          response = _context.sent;
          if (response.ok) {
            _context.next = 11;
            break;
          }
          throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0430: ".concat(response.status));
        case 11:
          return _context.abrupt("return", response);
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          console.error("Произошла ошибка:", _context.t0.message);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 14]]);
  }));
  return function fetchRequest(_x) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/api/film.js":
/*!*************************!*\
  !*** ./src/api/film.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getActors: () => (/* binding */ getActors),
/* harmony export */   getFilmData: () => (/* binding */ getFilmData)
/* harmony export */ });
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch.js */ "./src/api/fetch.js");
/* harmony import */ var _utils_timeConvert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/timeConvert.js */ "./src/utils/timeConvert.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


function getFilmData(_x) {
  return _getFilmData.apply(this, arguments);
}
function _getFilmData() {
  _getFilmData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filmId) {
    var response, filmData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)("".concat(_fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP, "/films/").concat(filmId, "/data"), "GET");
        case 3:
          response = _context.sent;
          _context.next = 6;
          return response.json();
        case 6:
          filmData = _context.sent;
          if (!(!filmData || _typeof(filmData) !== "object")) {
            _context.next = 9;
            break;
          }
          throw new Error("Ошибка: полученные данные не являются объектом");
        case 9:
          filmData.film.duration = _utils_timeConvert_js__WEBPACK_IMPORTED_MODULE_1__.timeConvert.timeIntoText(filmData.film.duration);
          filmData.film.date = _utils_timeConvert_js__WEBPACK_IMPORTED_MODULE_1__.timeConvert.dateIntoYear(filmData.film.date);
          return _context.abrupt("return", filmData.film);
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error("Произошла ошибка:", _context.t0.message);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 14]]);
  }));
  return _getFilmData.apply(this, arguments);
}
function getActors(_x2) {
  return _getActors.apply(this, arguments);
}
function _getActors() {
  _getActors = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(filmId) {
    var response, filmActors;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)("".concat(_fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP, "/films/").concat(filmId, "/actors"), "GET");
        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return response.json();
        case 6:
          filmActors = _context2.sent;
          if (!(!filmActors || _typeof(filmActors) !== "object")) {
            _context2.next = 9;
            break;
          }
          throw new Error("Ошибка: полученные данные не являются объектом");
        case 9:
          return _context2.abrupt("return", filmActors.actors);
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error("Произошла ошибка:", _context2.t0.message);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 12]]);
  }));
  return _getActors.apply(this, arguments);
}

/***/ }),

/***/ "./src/api/films.js":
/*!**************************!*\
  !*** ./src/api/films.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAll: () => (/* binding */ getAll),
/* harmony export */   getGenres: () => (/* binding */ getGenres),
/* harmony export */   getTopFour: () => (/* binding */ getTopFour)
/* harmony export */ });
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch.js */ "./src/api/fetch.js");
/* harmony import */ var _utils_transformers_filmDataWithDuration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/transformers/filmDataWithDuration.js */ "./src/utils/transformers/filmDataWithDuration.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var topFourFilms = [{
  preview_data: "https://media.kg-portal.ru/movies/a/avengers4/posters/avengers4_80.jpg",
  title: "Мстители: Финал",
  duration: 7560,
  film_data: "С помощью оставшихся союзников Мстители должны вновь собраться, чтобы отменить действия Таноса и устранить хаос во Вселенной, какие бы последствия их ни ждали и с кем бы они ни столкнулись... Отомстите за павших."
}, {
  preview_data: "https://www.kino-teatr.ru/movie/poster/143085/119148.jpg",
  title: "Универ 15 лет спустя",
  duration: 7560,
  film_data: "Прошло десять лет. Майкл, Варя, Антон, Кристина, Маша, Валя и Яна повзрослели и больше не живут в одном блоке общаги, но проблем у них меньше не стало. Они продолжают общаться и поддерживать друг друга в трудных жизненных ситуациях."
}, {
  preview_data: "https://www.kino-teatr.ru/movie/poster/143085/119148.jpg",
  title: "Универ 20 лет спустя",
  duration: 7560,
  film_data: "Прошло двадцать лет. Майкл, Варя, Антон, Кристина, Маша, Валя и Яна повзрослели и больше не живут в одном блоке общаги, но проблем у них меньше не стало. Они продолжают общаться и поддерживать друг друга в трудных жизненных ситуациях."
}, {
  preview_data: "https://www.kino-teatr.ru/movie/poster/143085/119148.jpg",
  title: "Универ 25 лет спустя",
  duration: 7560,
  film_data: "Прошло двадцать пять лет. Майкл, Варя, Антон, Кристина, Маша, Валя и Яна повзрослели и больше не живут в одном блоке общаги, но проблем у них меньше не стало. Они продолжают общаться и поддерживать друг друга в трудных жизненных ситуациях."
}];
var genresData = [{
  name: "Боевик",
  posters: ["https://yobte.ru/uploads/posts/2019-07/podborka-plakatov-s-gerojami-boevikov-80-h-90-h-godov-12.jpg", "https://i.pinimg.com/originals/dd/bc/5c/ddbc5c9c728a04c57b7e7ba05fdb93ba.jpg", "https://lightbox-prod.imgix.net/images/assets/100141671-p9000544_v_v10_ac.jpg", "https://media.kg-portal.ru/movies/s/security/posters/security_2.jpg"]
}, {
  name: "Комедия",
  posters: ["https://images.justwatch.com/poster/301028172/s718/gentlemen-of-fortune.%7Bformat%7D", "https://fs.kinomania.ru/file/film_poster/c/5a/c5ac4788fb9f7d49b78128ce3c2637e3.jpeg", "https://4tololo.ru/sites/default/files/images/20140907132433.jpg?itok=WNvojXhV", "https://pic.rutubelist.ru/video/a0/77/a077b5f93cb7474e527b15f154a97341.jpg"]
}, {
  name: "Драма",
  posters: ["https://sun9-67.userapi.com/impg/E8pgKo9kqiHUxPQd-AamV2YsTnb_zOTFO0H6KQ/5lKdkFFLG2Q.jpg?size=646x807&quality=95&sign=c784fde94499b2c6bb4ead461fc3ab92&c_uniq_tag=5tZv8sO0MhCbilTXrMxtwP7iztmm_mV47D74XQdZVbs&type=album", "https://u2.9111s.ru/uploads/202302/06/fad90e48a7a82f234725d11aeddd042d.jpg", "https://dominioncinema.ru/upload/iblock/2aa/ap70cucz9oc1ivrjz17z9iohhac7nem4.jpg", "https://i.pinimg.com/originals/19/b8/c5/19b8c5b123a4b5301cf44785452cd20e.jpg"]
}, {
  name: "Фэнтези",
  posters: ["https://i2.wp.com/www.weidmangallery.com/wp-content/uploads/2019/05/WG00911.jpg?fit=4224%2C2816&ssl=1", "https://media.filmz.ru/photos/full/filmz.ru_f_72760.jpg", "https://i.artfile.ru/3840x2160_1566401_[www.ArtFile.ru].jpg", "https://i.pinimg.com/originals/6d/44/82/6d4482ab03ca7de7405144221256edcd.jpg"]
}, {
  name: "Фэнтези",
  posters: ["https://i2.wp.com/www.weidmangallery.com/wp-content/uploads/2019/05/WG00911.jpg?fit=4224%2C2816&ssl=1", "https://media.filmz.ru/photos/full/filmz.ru_f_72760.jpg", "https://i.artfile.ru/3840x2160_1566401_[www.ArtFile.ru].jpg", "https://i.pinimg.com/originals/6d/44/82/6d4482ab03ca7de7405144221256edcd.jpg"]
}];

/**
 * Запрос на получение массива с фильмами
 * @function
 * @return {Promise} promise - Объект запроса
 */
function getAll() {
  return _getAll.apply(this, arguments);
}
function _getAll() {
  _getAll = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var url, response, filmsData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          url = _fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP + "/films/all";
          _context.next = 4;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)(url, "GET");
        case 4:
          response = _context.sent;
          _context.next = 7;
          return response.json();
        case 7:
          filmsData = _context.sent;
          if (!(!filmsData || !filmsData.films || !Array.isArray(filmsData.films))) {
            _context.next = 10;
            break;
          }
          throw new Error("Ошибка: ответ не содержит массив фильмов");
        case 10:
          return _context.abrupt("return", (0,_utils_transformers_filmDataWithDuration_js__WEBPACK_IMPORTED_MODULE_1__.toFilmDataWithDuration)(filmsData.films));
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error("Произошла ошибка:", _context.t0.message);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return _getAll.apply(this, arguments);
}
function getTopFour() {
  return _getTopFour.apply(this, arguments);
}
function _getTopFour() {
  _getTopFour = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          return _context2.abrupt("return", new Promise(function (resolve) {
            resolve((0,_utils_transformers_filmDataWithDuration_js__WEBPACK_IMPORTED_MODULE_1__.toFilmDataWithDuration)(topFourFilms));
          }));
        case 4:
          _context2.prev = 4;
          _context2.t0 = _context2["catch"](0);
          console.error("Произошла ошибка:", _context2.t0.message);
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 4]]);
  }));
  return _getTopFour.apply(this, arguments);
}
function getGenres() {
  return _getGenres.apply(this, arguments);
}
function _getGenres() {
  _getGenres = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          return _context3.abrupt("return", new Promise(function (resolve) {
            resolve(genresData);
          }));
        case 4:
          _context3.prev = 4;
          _context3.t0 = _context3["catch"](0);
          console.error("Произошла ошибка:", _context3.t0.message);
        case 7:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 4]]);
  }));
  return _getGenres.apply(this, arguments);
}

/***/ }),

/***/ "./src/api/profile.js":
/*!****************************!*\
  !*** ./src/api/profile.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHANGE_AVATAR_ACTION: () => (/* binding */ CHANGE_AVATAR_ACTION),
/* harmony export */   CHANGE_PASSWORD_ACTION: () => (/* binding */ CHANGE_PASSWORD_ACTION),
/* harmony export */   CHANGE_USERNAME_ACTION: () => (/* binding */ CHANGE_USERNAME_ACTION),
/* harmony export */   editProfile: () => (/* binding */ editProfile),
/* harmony export */   getProfileData: () => (/* binding */ getProfileData),
/* harmony export */   getProfilePreview: () => (/* binding */ getProfilePreview)
/* harmony export */ });
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch.js */ "./src/api/fetch.js");
/* harmony import */ var _utils_transformers_filmDataWithDuration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/transformers/filmDataWithDuration.js */ "./src/utils/transformers/filmDataWithDuration.js");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var CHANGE_USERNAME_ACTION = "chUsername";
var CHANGE_PASSWORD_ACTION = "chPassword";
var CHANGE_AVATAR_ACTION = "chAvatar";

/**
 * Запрос на получение данных о пользователе
 * @function
 * @param {string} uuid - Идентификатор пользователя.
 * @return {Promise} promise - Объект запроса
 */
function getProfileData(_x) {
  return _getProfileData.apply(this, arguments);
}
function _getProfileData() {
  _getProfileData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(uuid) {
    var response, data;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)("".concat(_fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP, "/profile/").concat(uuid, "/data"), "GET");
        case 3:
          response = _context.sent;
          _context.next = 6;
          return response.json();
        case 6:
          data = _context.sent;
          if (!(!data || _typeof(data) !== "object")) {
            _context.next = 9;
            break;
          }
          throw new Error("Ошибка: полученные данные не являются объектом");
        case 9:
          return _context.abrupt("return", (0,_utils_transformers_filmDataWithDuration_js__WEBPACK_IMPORTED_MODULE_1__.fixUserData)(data.user));
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error("Произошла ошибка: ", _context.t0.message);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _getProfileData.apply(this, arguments);
}
function editProfile(_x2, _x3) {
  return _editProfile.apply(this, arguments);
}
function _editProfile() {
  _editProfile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(uuid, editData) {
    var response, responseData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)("".concat(_fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP, "/profile/").concat(uuid, "/edit"), "POST", editData);
        case 3:
          response = _context2.sent;
          _context2.next = 6;
          return response.json();
        case 6:
          responseData = _context2.sent;
          return _context2.abrupt("return", responseData.status === 200);
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error("Произошла ошибка: ", _context2.t0.message);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _editProfile.apply(this, arguments);
}
function getProfilePreview(_x4) {
  return _getProfilePreview.apply(this, arguments);
}
function _getProfilePreview() {
  _getProfilePreview = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(uuid) {
    var response, data;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0,_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchRequest)("".concat(_fetch_js__WEBPACK_IMPORTED_MODULE_0__.IP, "/profile/").concat(uuid, "/preview"), "GET");
        case 3:
          response = _context3.sent;
          _context3.next = 6;
          return response.json();
        case 6:
          data = _context3.sent;
          if (!(!data || _typeof(data) !== "object")) {
            _context3.next = 9;
            break;
          }
          throw new Error("Ошибка: полученные данные не являются объектом");
        case 9:
          return _context3.abrupt("return", data.user.Avatar);
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.error("Произошла ошибка: ", _context3.t0.message);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return _getProfilePreview.apply(this, arguments);
}

/***/ }),

/***/ "./src/components/Actor/actor.js":
/*!***************************************!*\
  !*** ./src/components/Actor/actor.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderActorPage: () => (/* binding */ renderActorPage)
/* harmony export */ });
/* harmony import */ var _api_actors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/actors.js */ "./src/api/actors.js");
/* harmony import */ var _api_films_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api/films.js */ "./src/api/films.js");
/* harmony import */ var _actor_hbs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actor.hbs */ "./src/components/Actor/actor.hbs");
/* harmony import */ var _actor_hbs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_actor_hbs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/router.js */ "./src/utils/router.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_router_js__WEBPACK_IMPORTED_MODULE_3__]);
_utils_router_js__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/**
 * Рендерит страницу актёра с данными об актёре
 * и списком фильмов, в которых он снялся.
 * @async
 * @function
 * @param {string} actorId - Идентификатор актёра.
 * @return {void}
 */
function renderActorPage(_x) {
  return _renderActorPage.apply(this, arguments);
}
function _renderActorPage() {
  _renderActorPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(actorId) {
    var _yield$Promise$all, _yield$Promise$all2, actorData, filmsData, actorSection, actorPageData, filmCards;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Promise.all([_api_actors_js__WEBPACK_IMPORTED_MODULE_0__.getActorData(actorId), _api_films_js__WEBPACK_IMPORTED_MODULE_1__.getAll()]);
        case 2:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          actorData = _yield$Promise$all2[0];
          filmsData = _yield$Promise$all2[1];
          actorSection = document.createElement("section");
          actorSection.classList.add("actor-section");
          actorPageData = _objectSpread(_objectSpread({}, actorData), {}, {
            filmsData: filmsData
          });
          document.querySelector("main").innerHTML = _actor_hbs__WEBPACK_IMPORTED_MODULE_2___default()(actorPageData);
          filmCards = document.querySelectorAll("[data-film-id]");
          filmCards.forEach(function (filmCard, index) {
            filmCard.addEventListener("click", function () {
              _utils_router_js__WEBPACK_IMPORTED_MODULE_3__["default"].goToFilmPage(filmCard.dataset.filmId, filmsData[index].title);
            });
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _renderActorPage.apply(this, arguments);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/components/Film/film.js":
/*!*************************************!*\
  !*** ./src/components/Film/film.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderFilmPage: () => (/* binding */ renderFilmPage)
/* harmony export */ });
/* harmony import */ var _api_film_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/film.js */ "./src/api/film.js");
/* harmony import */ var _Film_hbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Film.hbs */ "./src/components/Film/Film.hbs");
/* harmony import */ var _Film_hbs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Film_hbs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/router.js */ "./src/utils/router.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_router_js__WEBPACK_IMPORTED_MODULE_2__]);
_utils_router_js__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



function renderFilmPage(_x) {
  return _renderFilmPage.apply(this, arguments);
}
function _renderFilmPage() {
  _renderFilmPage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(filmId) {
    var _yield$Promise$all, _yield$Promise$all2, filmData, filmActors, actorCards, playerButton;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Promise.all([_api_film_js__WEBPACK_IMPORTED_MODULE_0__.getFilmData(filmId), _api_film_js__WEBPACK_IMPORTED_MODULE_0__.getActors(filmId)]);
        case 2:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          filmData = _yield$Promise$all2[0];
          filmActors = _yield$Promise$all2[1];
          document.querySelector("main").innerHTML = _Film_hbs__WEBPACK_IMPORTED_MODULE_1___default()(_objectSpread(_objectSpread({}, filmData), {}, {
            filmActors: filmActors
          }));
          actorCards = document.querySelectorAll("[data-actor-id]");
          actorCards.forEach(function (actorCard, index) {
            actorCard.addEventListener("click", function () {
              _utils_router_js__WEBPACK_IMPORTED_MODULE_2__["default"].goToActorPage(actorCard.dataset.actorId, filmActors[index].name);
            });
          });
          playerButton = document.querySelector(".accent-button");
          playerButton.addEventListener("click", function (e) {
            e.preventDefault();
            _utils_router_js__WEBPACK_IMPORTED_MODULE_2__["default"].goToPlayerPage(filmId, filmData.title, filmData.link);
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _renderFilmPage.apply(this, arguments);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/components/Films/films.js":
/*!***************************************!*\
  !*** ./src/components/Films/films.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderFilms: () => (/* binding */ renderFilms)
/* harmony export */ });
/* harmony import */ var _api_films_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/films.js */ "./src/api/films.js");
/* harmony import */ var _Films_hbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Films.hbs */ "./src/components/Films/Films.hbs");
/* harmony import */ var _Films_hbs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Films_hbs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Slider_renderSlider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Slider/renderSlider.js */ "./src/components/Slider/renderSlider.js");
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/router.js */ "./src/utils/router.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_router_js__WEBPACK_IMPORTED_MODULE_3__]);
_utils_router_js__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





/**
 * Рендерит страницу фильмов, получает данные о фильмах с сервера,
 * преобразует данные и отображает список фильмов на странице.
 * @async
 * @function
 * @return {void}
 */
function renderFilms() {
  return _renderFilms.apply(this, arguments);
}
function _renderFilms() {
  _renderFilms = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _yield$Promise$all, _yield$Promise$all2, filmData, topFourFilms, filmsGenres, filmCards;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Promise.all([_api_films_js__WEBPACK_IMPORTED_MODULE_0__.getAll(), _api_films_js__WEBPACK_IMPORTED_MODULE_0__.getTopFour(), _api_films_js__WEBPACK_IMPORTED_MODULE_0__.getGenres()]);
        case 3:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
          filmData = _yield$Promise$all2[0];
          topFourFilms = _yield$Promise$all2[1];
          filmsGenres = _yield$Promise$all2[2];
          topFourFilms[0].active = "data-active";
          document.querySelector("main").innerHTML = _Films_hbs__WEBPACK_IMPORTED_MODULE_1___default()({
            filmData: filmData,
            topFourFilms: topFourFilms,
            filmsGenres: filmsGenres
          });
          (0,_Slider_renderSlider_js__WEBPACK_IMPORTED_MODULE_2__.renderSlider)();
          filmCards = document.querySelectorAll("[data-film-id]");
          filmCards.forEach(function (filmCard) {
            filmCard.addEventListener("click", function () {
              _utils_router_js__WEBPACK_IMPORTED_MODULE_3__["default"].goToFilmPage(filmCard.dataset.filmId, filmCard.dataset.filmTitle);
            });
          });
          _context.next = 18;
          break;
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.error("Error rendering films:", _context.t0);
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  }));
  return _renderFilms.apply(this, arguments);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/components/Login/login.js":
/*!***************************************!*\
  !*** ./src/components/Login/login.js ***!
  \***************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderLogin: () => (/* binding */ renderLogin)
/* harmony export */ });
/* harmony import */ var _utils_validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/validate.js */ "./src/utils/validate.js");
/* harmony import */ var _api_auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api/auth.js */ "./src/api/auth.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../index.js */ "./src/index.js");
/* harmony import */ var _Login_hbs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Login.hbs */ "./src/components/Login/Login.hbs");
/* harmony import */ var _Login_hbs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Login_hbs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/router.js */ "./src/utils/router.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index_js__WEBPACK_IMPORTED_MODULE_2__, _utils_router_js__WEBPACK_IMPORTED_MODULE_4__]);
([_index_js__WEBPACK_IMPORTED_MODULE_2__, _utils_router_js__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






/**
 * Рендерит страницу входа в систему, обрабатывает событие отправки формы,
 * валидирует введенные данные и отправляет запрос
 * на сервер для аутентификации пользователя.
 * @function
 * @return {void}
 */
function renderLogin() {
  document.querySelector("main").innerHTML = _Login_hbs__WEBPACK_IMPORTED_MODULE_3___default()();
  var form = document.querySelector(".form-section");
  var emailInput = document.querySelector('input[type="email"]');
  var passwordInput = document.querySelector('input[type="password"]');
  form.addEventListener("submit", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
      var login, password, user, _errorField, isAuthorized, errorField;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            login = emailInput.value.trim();
            password = passwordInput.value;
            user = {
              login: login,
              password: password
            };
            if (!_utils_validate_js__WEBPACK_IMPORTED_MODULE_0__.validators.login(login)) {
              _errorField = document.getElementById("login-errors");
              _errorField.innerText = "Поле почта введено некорректно";
            }
            _context.next = 7;
            return _api_auth_js__WEBPACK_IMPORTED_MODULE_1__.login(user);
          case 7:
            isAuthorized = _context.sent;
            _context.next = 10;
            return _index_js__WEBPACK_IMPORTED_MODULE_2__.menu.renderAuth(isAuthorized);
          case 10:
            if (!isAuthorized) {
              _context.next = 14;
              break;
            }
            _context.next = 13;
            return _utils_router_js__WEBPACK_IMPORTED_MODULE_4__["default"].goToHomePage();
          case 13:
            return _context.abrupt("return");
          case 14:
            errorField = document.getElementById("login-errors");
            errorField.innerText = "Неверная почта или пароль";
          case 16:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/components/Logout/logout.js":
/*!*****************************************!*\
  !*** ./src/components/Logout/logout.js ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderLogout: () => (/* binding */ renderLogout)
/* harmony export */ });
/* harmony import */ var _api_auth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/auth.js */ "./src/api/auth.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../index.js */ "./src/index.js");
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/router.js */ "./src/utils/router.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index_js__WEBPACK_IMPORTED_MODULE_1__, _utils_router_js__WEBPACK_IMPORTED_MODULE_2__]);
([_index_js__WEBPACK_IMPORTED_MODULE_1__, _utils_router_js__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




/**
 * Отправляет запрос на сервер для выхода из аккаунта,
 * обновляет отображение меню и перенаправляет
 * на страницу фильмов при успешном выходе.
 * @async
 * @function
 * @return {void}
 */
function renderLogout() {
  return _renderLogout.apply(this, arguments);
}
function _renderLogout() {
  _renderLogout = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var isAuthorized;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _api_auth_js__WEBPACK_IMPORTED_MODULE_0__.logout();
        case 2:
          isAuthorized = _context.sent;
          _context.next = 5;
          return _index_js__WEBPACK_IMPORTED_MODULE_1__.menu.renderAuth();
        case 5:
          if (!isAuthorized) {
            _context.next = 9;
            break;
          }
          (0,_index_js__WEBPACK_IMPORTED_MODULE_1__.changeActiveButton)("/");
          _context.next = 9;
          return _utils_router_js__WEBPACK_IMPORTED_MODULE_2__["default"].goToHomePage();
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _renderLogout.apply(this, arguments);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/components/Menu/Menu.js":
/*!*************************************!*\
  !*** ./src/components/Menu/Menu.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Menu: () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var _utils_createLinks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/createLinks.js */ "./src/utils/createLinks.js");
/* harmony import */ var _Menu_hbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Menu.hbs */ "./src/components/Menu/Menu.hbs");
/* harmony import */ var _Menu_hbs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Menu_hbs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_profile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../api/profile.js */ "./src/api/profile.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../index.js */ "./src/index.js");
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/router.js */ "./src/utils/router.js");
/* harmony import */ var _api_auth_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../api/auth.js */ "./src/api/auth.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index_js__WEBPACK_IMPORTED_MODULE_3__, _utils_router_js__WEBPACK_IMPORTED_MODULE_4__]);
([_index_js__WEBPACK_IMPORTED_MODULE_3__, _utils_router_js__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }






var application = document.getElementById("root");
var menuRoutes = {
  films: _utils_router_js__WEBPACK_IMPORTED_MODULE_4__["default"].goToHomePage,
  profile: _utils_router_js__WEBPACK_IMPORTED_MODULE_4__["default"].goToProfilePage,
  login: _utils_router_js__WEBPACK_IMPORTED_MODULE_4__["default"].goToLoginPage,
  signup: _utils_router_js__WEBPACK_IMPORTED_MODULE_4__["default"].goToSignupPage,
  logout: _utils_router_js__WEBPACK_IMPORTED_MODULE_4__["default"].goToLogout,
  support: _utils_router_js__WEBPACK_IMPORTED_MODULE_4__["default"].goToHomePage,
  // временно
  subscription: _utils_router_js__WEBPACK_IMPORTED_MODULE_4__["default"].goToHomePage // временно
};

/**
 * Класс, представляющий меню на веб-странице.
 * @class
 */
var _parent = /*#__PURE__*/new WeakMap();
var _config = /*#__PURE__*/new WeakMap();
var Menu = /*#__PURE__*/function () {
  /**
   * Создает экземпляр класса Menu.
   * @constructor
   * @param {HTMLElement} parent - Родительский элемент,
   * в котором будет отображаться меню.
   * @param {Object} config - Конфигурация меню,
   * содержащая информацию о пунктах меню.
   */
  function Menu(parent, config) {
    _classCallCheck(this, Menu);
    _classPrivateFieldInitSpec(this, _parent, void 0);
    _classPrivateFieldInitSpec(this, _config, void 0);
    _classPrivateFieldSet(_parent, this, parent);
    _classPrivateFieldSet(_config, this, config);
    this.state = {
      activeMenuLink: null,
      menuElements: {}
    };
  }

  /**
   * Возвращает конфигурацию меню.
   * @type {Object}
   */
  return _createClass(Menu, [{
    key: "config",
    get: function get() {
      return _classPrivateFieldGet(_config, this);
    }

    /**
     * Рендерит меню, используя предоставленный шаблон.
     * @method
     * @return {void}
     */
  }, {
    key: "render",
    value: function render() {
      this.renderTemplate();
    }

    /**
     * Возвращает массив пунктов меню в формате [ключ, значение].
     * @type {Array}
     */
  }, {
    key: "items",
    get: function get() {
      return Object.entries(this.config.menu);
    }

    /**
     * Возвращает массив элементов аутентификации.
     * @type {Array}
     */
  }, {
    key: "authItems",
    get: function get() {
      return Object.entries(this.config.authElements);
    }

    /**
     * Возвращает массив элементов без аутентификации.
     * @type {Array}
     */
  }, {
    key: "noAuthItems",
    get: function get() {
      return Object.entries(this.config.noAuthElements);
    }

    /**
     * Рендерит элементы аутентификации в зависимости от статуса авторизации.
     */
  }, {
    key: "renderAuth",
    value: (function () {
      var _renderAuth = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(isAuthorized) {
        var authBlock, avatar, dropdown, dropdownIcon, dropdownContent;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(isAuthorized === undefined)) {
                _context.next = 4;
                break;
              }
              _context.next = 3;
              return _api_auth_js__WEBPACK_IMPORTED_MODULE_5__.check();
            case 3:
              isAuthorized = _context.sent;
            case 4:
              authBlock = document.getElementById("auth");
              authBlock.innerHTML = "";
              authBlock.className = "";
              if (isAuthorized) {
                _context.next = 12;
                break;
              }
              authBlock.classList.add("no-auth-elements");
              this.noAuthItems.forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  _ref2$ = _ref2[1],
                  href = _ref2$.href,
                  text = _ref2$.text;
                var menuItem = (0,_utils_createLinks_js__WEBPACK_IMPORTED_MODULE_0__.createLink)({
                  href: href,
                  text: text,
                  key: key,
                  classNames: "auth-item"
                });
                authBlock.appendChild(menuItem);
              });
              _context.next = 31;
              break;
            case 12:
              authBlock.classList.add("auth-elements");
              avatar = document.createElement("img");
              _context.next = 16;
              return (0,_api_profile_js__WEBPACK_IMPORTED_MODULE_2__.getProfilePreview)((0,_index_js__WEBPACK_IMPORTED_MODULE_3__.getCookie)("user_uuid"));
            case 16:
              avatar.src = _context.sent;
              avatar.alt = "Avatar";
              avatar.classList.add("avatar");
              authBlock.appendChild(avatar);
              dropdown = document.createElement("div");
              dropdownIcon = document.createElement("img");
              dropdownIcon.src = "./icons/dropdown.svg";
              dropdownIcon.alt = "Dropdown";
              dropdown.classList.add("dropdown");
              dropdown.appendChild(dropdownIcon);
              dropdownContent = document.createElement("div");
              dropdownContent.classList.add("dropdown-content");
              this.authItems.forEach(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                  key = _ref4[0],
                  _ref4$ = _ref4[1],
                  href = _ref4$.href,
                  text = _ref4$.text;
                var menuItem = (0,_utils_createLinks_js__WEBPACK_IMPORTED_MODULE_0__.createLink)({
                  href: href,
                  text: text,
                  key: key,
                  classNames: "auth-item"
                });
                authBlock.appendChild(menuItem);
                dropdownContent.appendChild(menuItem);
              });
              dropdown.appendChild(dropdownContent);
              authBlock.appendChild(dropdown);
            case 31:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function renderAuth(_x) {
        return _renderAuth.apply(this, arguments);
      }
      return renderAuth;
    }()
    /**
     * Рендерит шаблон меню и вставляет его в родительский элемент.
     * @private
     * @method
     * @return {void}
     */
    )
  }, {
    key: "renderTemplate",
    value: function renderTemplate() {
      var _this = this;
      var items = this.items.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
          key = _ref6[0],
          _ref6$ = _ref6[1],
          href = _ref6$.href,
          text = _ref6$.text;
        var className = "menu-item";
        return {
          key: key,
          href: href,
          text: text,
          className: className
        };
      });
      _classPrivateFieldGet(_parent, this).innerHTML = _Menu_hbs__WEBPACK_IMPORTED_MODULE_1___default()({
        items: items
      });
      _classPrivateFieldGet(_parent, this).querySelectorAll("a").forEach(function (element) {
        _this.state.menuElements[element.dataset.section] = element;
      });
    }
  }]);
}();
application.addEventListener("click", function (e) {
  var target = e.target;
  if (target instanceof HTMLAnchorElement) {
    e.preventDefault();
    menuRoutes[target.dataset.section]();
  }
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/components/Player/player.js":
/*!*****************************************!*\
  !*** ./src/components/Player/player.js ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderPlayer: () => (/* binding */ renderPlayer)
/* harmony export */ });
/* harmony import */ var _utils_timeConvert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/timeConvert.js */ "./src/utils/timeConvert.js");
/* harmony import */ var _Player_hbs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player.hbs */ "./src/components/Player/Player.hbs");
/* harmony import */ var _Player_hbs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Player_hbs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _img_imgConstants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../img/imgConstants.js */ "./src/img/imgConstants.js");
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/router.js */ "./src/utils/router.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_router_js__WEBPACK_IMPORTED_MODULE_3__]);
_utils_router_js__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }




function renderPlayer(_x, _x2, _x3) {
  return _renderPlayer.apply(this, arguments);
}
function _renderPlayer() {
  _renderPlayer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(filmId, filmTitle, source) {
    var video, exitButton, container, mainVideo, progressBar, videoTimeline, volumeBtn, volumeSlider, currentVideoTime, videoDuration, nextSeries, previousSeries, playPauseBtn, speedBtn, speedOptions, pinInPicBtn, fullscreenBtn, wrapper, timer, hideControls, draggableProgressBar;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          video = {
            src: source
          };
          document.querySelector("main").innerHTML = _Player_hbs__WEBPACK_IMPORTED_MODULE_1___default()(video);
          exitButton = document.querySelector("#exit-player");
          container = document.querySelector(".player-container");
          mainVideo = container.querySelector("video");
          progressBar = container.querySelector(".progress-bar");
          videoTimeline = container.querySelector(".video-timeline");
          volumeBtn = container.querySelector(".volume img");
          volumeSlider = container.querySelector(".left input");
          currentVideoTime = container.querySelector(".current-time");
          videoDuration = container.querySelector(".video-duration");
          nextSeries = container.querySelector(".skip-forward img");
          previousSeries = container.querySelector(".skip-backward img");
          playPauseBtn = container.querySelector(".play-pause img");
          speedBtn = container.querySelector(".playback-speed span");
          speedOptions = container.querySelector(".speed-options");
          pinInPicBtn = container.querySelector(".pic-in-pic span");
          fullscreenBtn = container.querySelector(".fullscreen img");
          wrapper = container.querySelector(".wrapper");
          hideControls = function hideControls() {
            if (mainVideo.paused) return;
            timer = setTimeout(function () {
              container.classList.add("no-cursor");
              container.classList.remove("show-controls");
            }, 1000);
          };
          hideControls();
          container.addEventListener("mousemove", function () {
            container.classList.remove("no-cursor");
            container.classList.add("show-controls");
            clearTimeout(timer);
            hideControls();
          });
          mainVideo.addEventListener("timeupdate", function (e) {
            var _e$target = e.target,
              currentTime = _e$target.currentTime,
              duration = _e$target.duration;
            var percent = currentTime / duration * 100;
            progressBar.style.width = "".concat(percent, "%");
            currentVideoTime.innerText = (0,_utils_timeConvert_js__WEBPACK_IMPORTED_MODULE_0__.formatTime)(currentTime);
          });
          mainVideo.addEventListener("loadeddata", function (e) {
            videoDuration.innerText = (0,_utils_timeConvert_js__WEBPACK_IMPORTED_MODULE_0__.formatTime)(e.target.duration);
          });
          videoTimeline.addEventListener("click", function (e) {
            var timelineWidth = videoTimeline.clientWidth;
            mainVideo.currentTime = e.offsetX / timelineWidth * mainVideo.duration;
          });
          draggableProgressBar = function draggableProgressBar(e) {
            var timelineWidth = videoTimeline.clientWidth;
            progressBar.style.width = "".concat(e.offsetX, "px");
            mainVideo.currentTime = e.offsetX / timelineWidth * mainVideo.duration;
            currentVideoTime.innerText = (0,_utils_timeConvert_js__WEBPACK_IMPORTED_MODULE_0__.formatTime)(mainVideo.currentTime);
          };
          videoTimeline.addEventListener("mousedown", function () {
            videoTimeline.addEventListener("mousemove", draggableProgressBar);
          });
          container.addEventListener("mouseup", function () {
            videoTimeline.removeEventListener("mousemove", draggableProgressBar);
          });
          videoTimeline.addEventListener("mousemove", function (e) {
            var progressTime = videoTimeline.querySelector("span");
            var offsetX = e.offsetX;
            progressTime.style.left = "".concat(offsetX, "px");
            var timelineWidth = videoTimeline.clientWidth;
            var percent = e.offsetX / timelineWidth * mainVideo.duration;
            progressTime.innerText = (0,_utils_timeConvert_js__WEBPACK_IMPORTED_MODULE_0__.formatTime)(percent);
          });
          volumeBtn.addEventListener("click", function () {
            if (mainVideo.volume) {
              mainVideo.volume = 0;
              volumeBtn.src = _img_imgConstants_js__WEBPACK_IMPORTED_MODULE_2__.NO_SOUND_IMG;
            } else {
              mainVideo.volume = 0.5;
              volumeBtn.src = _img_imgConstants_js__WEBPACK_IMPORTED_MODULE_2__.SOUND_IMG;
            }
            volumeSlider.value = mainVideo.volume;
          });
          volumeSlider.addEventListener("input", function (e) {
            var volumeValue = parseFloat(e.target.value);
            mainVideo.volume = volumeValue;
            volumeBtn.src = volumeValue === 0 ? _img_imgConstants_js__WEBPACK_IMPORTED_MODULE_2__.NO_SOUND_IMG : _img_imgConstants_js__WEBPACK_IMPORTED_MODULE_2__.SOUND_IMG;
          });
          speedOptions.querySelectorAll("li").forEach(function (option) {
            option.addEventListener("click", function () {
              mainVideo.playbackRate = parseFloat(option.dataset.speed);
              speedOptions.querySelector(".active").classList.remove("active");
              option.classList.add("active");
            });
          });
          speedBtn.addEventListener("click", function () {
            speedOptions.classList.toggle("show");
          });
          wrapper.addEventListener("click", function (e) {
            if (e.target.className === "wrapper") {
              mainVideo.paused ? mainVideo.play() : mainVideo.pause();
            }
          });
          document.addEventListener("click", function (e) {
            if (e.target.tagName !== "IMG" || e.target.className !== "speed-img") {
              speedOptions.classList.remove("show");
            }
          });
          pinInPicBtn.addEventListener("click", function () {
            mainVideo.requestPictureInPicture();
          });
          fullscreenBtn.addEventListener("click", function () {
            container.classList.toggle("fullscreen");
            if (document.fullscreenElement) {
              fullscreenBtn.src = _img_imgConstants_js__WEBPACK_IMPORTED_MODULE_2__.FULLSCREEN_IMG;
              return document.exitFullscreen();
            }
            fullscreenBtn.src = _img_imgConstants_js__WEBPACK_IMPORTED_MODULE_2__.EXIT_FULLSCREEN_IMG;
            container.requestFullscreen();
          });
          previousSeries.addEventListener("click", function () {
            // TODO переход на предыдущую серию, если это сериал
          });
          nextSeries.addEventListener("click", function () {
            // TODO переход на следующую серию, если это сериал
          });
          playPauseBtn.addEventListener("click", function () {
            mainVideo.paused ? mainVideo.play() : mainVideo.pause();
          });
          mainVideo.addEventListener("play", function () {
            playPauseBtn.src = _img_imgConstants_js__WEBPACK_IMPORTED_MODULE_2__.PAUSE_IMG;
          });
          mainVideo.addEventListener("pause", function () {
            playPauseBtn.src = _img_imgConstants_js__WEBPACK_IMPORTED_MODULE_2__.PLAY_IMG;
          });
          exitButton.addEventListener("click", /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    e.preventDefault();
                    _utils_router_js__WEBPACK_IMPORTED_MODULE_3__["default"].goToFilmPage(filmId, filmTitle);
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x4) {
              return _ref.apply(this, arguments);
            };
          }());
        case 43:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _renderPlayer.apply(this, arguments);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/components/Profile/profile.js":
/*!*******************************************!*\
  !*** ./src/components/Profile/profile.js ***!
  \*******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderEditForm: () => (/* binding */ renderEditForm),
/* harmony export */   renderProfile: () => (/* binding */ renderProfile)
/* harmony export */ });
/* harmony import */ var _api_profile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/profile.js */ "./src/api/profile.js");
/* harmony import */ var _api_films_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api/films.js */ "./src/api/films.js");
/* harmony import */ var _utils_validate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/validate.js */ "./src/utils/validate.js");
/* harmony import */ var _Profile_hbs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Profile.hbs */ "./src/components/Profile/Profile.hbs");
/* harmony import */ var _Profile_hbs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Profile_hbs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editForm_hbs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editForm.hbs */ "./src/components/Profile/editForm.hbs");
/* harmony import */ var _editForm_hbs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_editForm_hbs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/router.js */ "./src/utils/router.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_utils_router_js__WEBPACK_IMPORTED_MODULE_5__]);
_utils_router_js__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







/**
 * Рендерит страницу актёра с данными об актёре
 * и списком фильмов, в которых он снялся.
 * @async
 * @function
 * @return {void}
 * @param profileId
 */
function renderProfile(_x) {
  return _renderProfile.apply(this, arguments);
}
function _renderProfile() {
  _renderProfile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(profileId) {
    var _yield$Promise$all, _yield$Promise$all2, profileData, filmsData, profilePageData, filmCards;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Promise.all([_api_profile_js__WEBPACK_IMPORTED_MODULE_0__.getProfileData(profileId), _api_films_js__WEBPACK_IMPORTED_MODULE_1__.getAll()]);
        case 2:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          profileData = _yield$Promise$all2[0];
          filmsData = _yield$Promise$all2[1];
          profilePageData = _objectSpread(_objectSpread({}, profileData), {}, {
            filmsData: filmsData
          });
          document.querySelector("main").innerHTML = _Profile_hbs__WEBPACK_IMPORTED_MODULE_3___default()(profilePageData);
          document.querySelector(".profile-page-buttons").addEventListener("click", function (e) {
            e.preventDefault();
            renderEditForm(profileId);
          });
          filmCards = document.querySelectorAll("[data-film-id]");
          filmCards.forEach(function (filmCard) {
            filmCard.addEventListener("click", function () {
              _utils_router_js__WEBPACK_IMPORTED_MODULE_5__["default"].goToFilmPage(filmCard.dataset.filmId, filmCard.dataset.filmTitle);
            });
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _renderProfile.apply(this, arguments);
}
function renderEditForm(_x2) {
  return _renderEditForm.apply(this, arguments);
}
function _renderEditForm() {
  _renderEditForm = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(profileId) {
    var editForm, usernameButton, avatarButton, passwordButton, exitButton, usernameInput, passConfInput, passwordInput, avatarInput;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          document.querySelector(".profile-info").innerHTML = _editForm_hbs__WEBPACK_IMPORTED_MODULE_4___default()();
          editForm = document.querySelector("#myForm");
          usernameButton = document.querySelector("#sendLoginBtn");
          avatarButton = document.querySelector("#sendImageBtn");
          passwordButton = document.querySelector("#sendPasswordBtn");
          exitButton = document.querySelector("#exit-editing-button");
          usernameInput = document.querySelector('input[name="username"]');
          passConfInput = document.querySelector('input[name="passConf"]');
          passwordInput = document.querySelector('input[name="password"]');
          avatarInput = document.querySelector('input[name="avatar"]');
          usernameButton.addEventListener("click", /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    e.preventDefault();
                    if (_utils_validate_js__WEBPACK_IMPORTED_MODULE_2__.validators.username(usernameInput.value)) {
                      _context2.next = 4;
                      break;
                    }
                    document.getElementById("username-errors").innerText = "Имя пользователя слишком короткое";
                    return _context2.abrupt("return");
                  case 4:
                    _context2.next = 6;
                    return _api_profile_js__WEBPACK_IMPORTED_MODULE_0__.editProfile(profileId, {
                      action: _api_profile_js__WEBPACK_IMPORTED_MODULE_0__.CHANGE_USERNAME_ACTION,
                      newData: usernameInput.value
                    });
                  case 6:
                    if (!_context2.sent) {
                      _context2.next = 8;
                      break;
                    }
                    renderProfile(profileId);
                  case 8:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x3) {
              return _ref.apply(this, arguments);
            };
          }());
          avatarButton.addEventListener("click", /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(e) {
              var avatar;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    e.preventDefault();
                    avatar = avatarInput.value;
                    if (avatar) {
                      _context3.next = 5;
                      break;
                    }
                    document.getElementById("avatar-errors").innerText = "Файл не выбран";
                    return _context3.abrupt("return");
                  case 5:
                    _context3.next = 7;
                    return _api_profile_js__WEBPACK_IMPORTED_MODULE_0__.editProfile(profileId, {
                      action: _api_profile_js__WEBPACK_IMPORTED_MODULE_0__.CHANGE_AVATAR_ACTION,
                      newData: new FormData(editForm)
                    });
                  case 7:
                    if (!_context3.sent) {
                      _context3.next = 9;
                      break;
                    }
                    renderProfile(profileId);
                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x4) {
              return _ref2.apply(this, arguments);
            };
          }());
          avatarInput.addEventListener("change", /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e) {
              var input, reader;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    input = event.target;
                    if (input.files && input.files[0]) {
                      reader = new FileReader();
                      reader.onload = function (e) {
                        var preview = document.getElementById("avatarPreview");
                        preview.src = e.target.result;
                        preview.style.display = "block";
                      };
                      reader.readAsDataURL(input.files[0]);
                    }
                  case 2:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x5) {
              return _ref3.apply(this, arguments);
            };
          }());
          passwordButton.addEventListener("click", /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(e) {
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    e.preventDefault();
                    if (_utils_validate_js__WEBPACK_IMPORTED_MODULE_2__.validators.password(passwordInput.value)) {
                      _context5.next = 4;
                      break;
                    }
                    document.getElementById("password-errors").innerText = "Пароль слишком короткий";
                    return _context5.abrupt("return");
                  case 4:
                    if (_utils_validate_js__WEBPACK_IMPORTED_MODULE_2__.validators.passwordConf(passwordInput.value, passConfInput.value)) {
                      _context5.next = 7;
                      break;
                    }
                    document.getElementById("password-errors").innerText = "Пароли не совпадают";
                    return _context5.abrupt("return");
                  case 7:
                    _context5.next = 9;
                    return _api_profile_js__WEBPACK_IMPORTED_MODULE_0__.editProfile(profileId, {
                      action: _api_profile_js__WEBPACK_IMPORTED_MODULE_0__.CHANGE_PASSWORD_ACTION,
                      newData: passwordInput.value
                    });
                  case 9:
                    if (!_context5.sent) {
                      _context5.next = 11;
                      break;
                    }
                    renderProfile(profileId);
                  case 11:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x6) {
              return _ref4.apply(this, arguments);
            };
          }());
          exitButton.addEventListener("click", /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e) {
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    e.preventDefault();
                    _context6.next = 3;
                    return renderProfile(profileId);
                  case 3:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x7) {
              return _ref5.apply(this, arguments);
            };
          }());
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _renderEditForm.apply(this, arguments);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/components/Signup/signup.js":
/*!*****************************************!*\
  !*** ./src/components/Signup/signup.js ***!
  \*****************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderSignup: () => (/* binding */ renderSignup)
/* harmony export */ });
/* harmony import */ var _utils_validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/validate.js */ "./src/utils/validate.js");
/* harmony import */ var _api_auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api/auth.js */ "./src/api/auth.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../index.js */ "./src/index.js");
/* harmony import */ var _Signup_hbs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Signup.hbs */ "./src/components/Signup/Signup.hbs");
/* harmony import */ var _Signup_hbs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Signup_hbs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/router.js */ "./src/utils/router.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_index_js__WEBPACK_IMPORTED_MODULE_2__, _utils_router_js__WEBPACK_IMPORTED_MODULE_4__]);
([_index_js__WEBPACK_IMPORTED_MODULE_2__, _utils_router_js__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






/**
 * Рендерит страницу регистрации, обрабатывает событие отправки формы,
 * валидирует введенные данные и отправляет запрос
 * на сервер для регистрации пользователя.
 * @async
 * @function
 * @return {void}
 */
function renderSignup() {
  return _renderSignup.apply(this, arguments);
}
function _renderSignup() {
  _renderSignup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var form, emailInput, usernameInput, passConfInput, passwordInput, errorField;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          document.querySelector("main").innerHTML = _Signup_hbs__WEBPACK_IMPORTED_MODULE_3___default()();
          form = document.querySelector(".form-section");
          emailInput = document.querySelector('input[name="email"]');
          usernameInput = document.querySelector('input[name="username"]');
          passConfInput = document.querySelector('input[name="passConf"]');
          passwordInput = document.querySelector('input[name="password"]');
          errorField = document.getElementById("signup-errors");
          form.addEventListener("submit", /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
              var login, password, passConf, username, user, isAuthorized;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    e.preventDefault();
                    login = emailInput.value.trim();
                    password = passwordInput.value;
                    passConf = passConfInput.value;
                    username = usernameInput.value;
                    user = {
                      password: password,
                      login: login,
                      username: username
                    };
                    if (_utils_validate_js__WEBPACK_IMPORTED_MODULE_0__.validators.username(username)) {
                      _context.next = 9;
                      break;
                    }
                    errorField.innerText = "Имя пользователя слишком короткое";
                    return _context.abrupt("return");
                  case 9:
                    if (_utils_validate_js__WEBPACK_IMPORTED_MODULE_0__.validators.login(login)) {
                      _context.next = 12;
                      break;
                    }
                    errorField.innerText = "Поле почта введено некорректно";
                    return _context.abrupt("return");
                  case 12:
                    if (_utils_validate_js__WEBPACK_IMPORTED_MODULE_0__.validators.password(password)) {
                      _context.next = 15;
                      break;
                    }
                    errorField.innerText = "Пароль слишком короткий";
                    return _context.abrupt("return");
                  case 15:
                    if (_utils_validate_js__WEBPACK_IMPORTED_MODULE_0__.validators.passwordConf(password, passConf)) {
                      _context.next = 18;
                      break;
                    }
                    errorField.innerText = "Пароли не совпадают";
                    return _context.abrupt("return");
                  case 18:
                    _context.next = 20;
                    return _api_auth_js__WEBPACK_IMPORTED_MODULE_1__.signup(user);
                  case 20:
                    isAuthorized = _context.sent;
                    if (!isAuthorized) {
                      _context.next = 29;
                      break;
                    }
                    _context.next = 24;
                    return _index_js__WEBPACK_IMPORTED_MODULE_2__.menu.renderAuth(isAuthorized);
                  case 24:
                    (0,_index_js__WEBPACK_IMPORTED_MODULE_2__.changeActiveButton)("/");
                    _context.next = 27;
                    return _utils_router_js__WEBPACK_IMPORTED_MODULE_4__["default"].goToHomePage();
                  case 27:
                    _context.next = 30;
                    break;
                  case 29:
                    errorField.innerText = "Такой пользователь уже существует";
                  case 30:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _renderSignup.apply(this, arguments);
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/components/Slider/renderSlider.js":
/*!***********************************************!*\
  !*** ./src/components/Slider/renderSlider.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderSlider: () => (/* binding */ renderSlider)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function renderSlider() {
  var buttons = document.querySelectorAll('[data-carousel-button]');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var offset = button.dataset.carouselButton === 'next' ? 1 : -1;
      var slides = button.closest('[data-carousel]').querySelector('[data-slides]');
      var activeSlide = slides.querySelector('[data-active]');
      var newIndex = _toConsumableArray(slides.children).indexOf(activeSlide) + offset;
      if (newIndex < 0) {
        newIndex = slides.children.length - 1;
      }
      if (newIndex >= slides.children.length) {
        newIndex = 0;
      }
      setActiveSlide(slides, newIndex);
    });
  });
  function setActiveSlide(slides, newIndex) {
    var activeSlide = slides.querySelector('[data-active]');
    if (activeSlide) {
      delete activeSlide.dataset.active;
    }
    slides.children[newIndex].dataset.active = true;
  }
}

/***/ }),

/***/ "./src/components/renderStarsRating.js":
/*!*********************************************!*\
  !*** ./src/components/renderStarsRating.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderStarsRating: () => (/* binding */ renderStarsRating)
/* harmony export */ });
var MAX_STARS = 5;
var FULL_STAR_IMG = '<img class="star" src="./icons/star-full.svg" alt="">';
var HALF_STAR_IMG = '<img class="star" src="./icons/star-half.svg" alt="">';
var NONE_STAR_IMG = '<img class="star" src="./icons/star-none.svg" alt="">';
var renderStarsRating = function renderStarsRating(roundedScore, remainder) {
  var starsHTML = "";
  for (var i = 0; i < MAX_STARS; i++) {
    if (i < roundedScore) {
      starsHTML += FULL_STAR_IMG;
    } else if (i === roundedScore && remainder >= 0.5) {
      starsHTML += HALF_STAR_IMG;
    } else {
      starsHTML += NONE_STAR_IMG;
    }
  }
  return starsHTML;
};

/***/ }),

/***/ "./src/img/imgConstants.js":
/*!*********************************!*\
  !*** ./src/img/imgConstants.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXIT_FULLSCREEN_IMG: () => (/* binding */ EXIT_FULLSCREEN_IMG),
/* harmony export */   FULLSCREEN_IMG: () => (/* binding */ FULLSCREEN_IMG),
/* harmony export */   NO_SOUND_IMG: () => (/* binding */ NO_SOUND_IMG),
/* harmony export */   PAUSE_IMG: () => (/* binding */ PAUSE_IMG),
/* harmony export */   PLAY_IMG: () => (/* binding */ PLAY_IMG),
/* harmony export */   SOUND_IMG: () => (/* binding */ SOUND_IMG)
/* harmony export */ });
var NO_SOUND_IMG = "./icons/no-sound.svg";
var SOUND_IMG = "./icons/sound-max.svg";
var PAUSE_IMG = "./icons/pause.svg";
var PLAY_IMG = "./icons/play.svg";
var FULLSCREEN_IMG = "./icons/fullscreen.svg";
var EXIT_FULLSCREEN_IMG = "./icons/fullscreen-exit.svg";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeActiveButton: () => (/* binding */ changeActiveButton),
/* harmony export */   getCookie: () => (/* binding */ getCookie),
/* harmony export */   menu: () => (/* binding */ menu),
/* harmony export */   renderMenu: () => (/* binding */ renderMenu)
/* harmony export */ });
/* harmony import */ var _components_Menu_Menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Menu/Menu.js */ "./src/components/Menu/Menu.js");
/* harmony import */ var _components_Films_films_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Films/films.js */ "./src/components/Films/films.js");
/* harmony import */ var _components_Login_login_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Login/login.js */ "./src/components/Login/login.js");
/* harmony import */ var _components_Signup_signup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Signup/signup.js */ "./src/components/Signup/signup.js");
/* harmony import */ var _components_Profile_profile_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Profile/profile.js */ "./src/components/Profile/profile.js");
/* harmony import */ var _components_Logout_logout_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Logout/logout.js */ "./src/components/Logout/logout.js");
/* harmony import */ var _utils_router_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/router.js */ "./src/utils/router.js");
/* harmony import */ var _src_index_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/index.scss */ "./src/index.scss");
/* harmony import */ var _components_renderStarsRating_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/renderStarsRating.js */ "./src/components/renderStarsRating.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Menu_Menu_js__WEBPACK_IMPORTED_MODULE_0__, _components_Films_films_js__WEBPACK_IMPORTED_MODULE_1__, _components_Login_login_js__WEBPACK_IMPORTED_MODULE_2__, _components_Signup_signup_js__WEBPACK_IMPORTED_MODULE_3__, _components_Profile_profile_js__WEBPACK_IMPORTED_MODULE_4__, _components_Logout_logout_js__WEBPACK_IMPORTED_MODULE_5__, _utils_router_js__WEBPACK_IMPORTED_MODULE_6__]);
([_components_Menu_Menu_js__WEBPACK_IMPORTED_MODULE_0__, _components_Films_films_js__WEBPACK_IMPORTED_MODULE_1__, _components_Login_login_js__WEBPACK_IMPORTED_MODULE_2__, _components_Signup_signup_js__WEBPACK_IMPORTED_MODULE_3__, _components_Profile_profile_js__WEBPACK_IMPORTED_MODULE_4__, _components_Logout_logout_js__WEBPACK_IMPORTED_MODULE_5__, _utils_router_js__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }










if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js", {
    scope: "/"
  }).then(function (reg) {
    console.log("SW register", reg);
  })["catch"](function (e) {
    console.log("SW Error", e);
  });
}
var rootElement = document.getElementById("root");
var menuElement = document.createElement("nav");
var pageElement = document.createElement("main");
rootElement.appendChild(menuElement);
rootElement.appendChild(pageElement);
var config = {
  menu: {
    films: {
      href: "/",
      text: "Фильмы и сериалы",
      render: _components_Films_films_js__WEBPACK_IMPORTED_MODULE_1__.renderFilms
    },
    support: {
      href: "/support",
      text: "Поддержка",
      render: _components_Films_films_js__WEBPACK_IMPORTED_MODULE_1__.renderFilms
    },
    subscription: {
      href: "/subscription",
      text: "Подписки",
      render: _components_Films_films_js__WEBPACK_IMPORTED_MODULE_1__.renderFilms
    }
  },
  authElements: {
    profile: {
      href: "/profile",
      text: "Профиль",
      render: _components_Profile_profile_js__WEBPACK_IMPORTED_MODULE_4__.renderProfile
    },
    logout: {
      href: "/logout",
      text: "Выйти",
      render: _components_Logout_logout_js__WEBPACK_IMPORTED_MODULE_5__.renderLogout
    }
  },
  noAuthElements: {
    login: {
      href: "/login",
      text: "Авторизоваться",
      render: _components_Login_login_js__WEBPACK_IMPORTED_MODULE_2__.renderLogin
    },
    signup: {
      href: "/signup",
      text: "Регистрация",
      render: _components_Signup_signup_js__WEBPACK_IMPORTED_MODULE_3__.renderSignup
    }
  }
};
var menu = new _components_Menu_Menu_js__WEBPACK_IMPORTED_MODULE_0__.Menu(menuElement, config);

/**
 * Рендерит меню, добавляет обработчик событий для навигации,
 * проверяет статус аутентификации пользователя и
 * соответственно обновляет отображение меню.
 * @function
 * @return {void}
 */
function renderMenu() {
  return _renderMenu.apply(this, arguments);
}

/**
 * Переходит на указанную страницу, очищает содержимое элемента страницы,
 * обновляет стили активного пункта меню,
 * и отображает соответствующую секцию страницы.
 * @function
 * @param {string} link
 * @return {void}
 */
function _renderMenu() {
  _renderMenu = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          menu.render();
          menuElement.addEventListener("click", function (e) {
            var target = e.target;
            if (target.tagName.toLowerCase() === "a") {
              e.preventDefault();
              changeActiveButton(target.href.replace("http://127.0.0.1:8080", ""));
            }
          });
        case 2:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _renderMenu.apply(this, arguments);
}
function changeActiveButton(link) {
  var _menu$state$activeMen;
  pageElement.innerHTML = "";
  var menuLinkElement = document.querySelector("a[href=\"".concat(link, "\"]"));
  (_menu$state$activeMen = menu.state.activeMenuLink) === null || _menu$state$activeMen === void 0 || _menu$state$activeMen.classList.remove("active");
  if (menuLinkElement) {
    menuLinkElement.classList.add("active");
  }
  menu.state.activeMenuLink = menuLinkElement;
}
function getCookie(name) {
  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
new _utils_router_js__WEBPACK_IMPORTED_MODULE_6__.Router();
renderMenu();
await menu.renderAuth();
window.addEventListener("popstate", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(e.state === null)) {
            _context.next = 5;
            break;
          }
          _context.next = 3;
          return _utils_router_js__WEBPACK_IMPORTED_MODULE_6__["default"].go("/", "Netrunnerflix", null, false);
        case 3:
          _context.next = 17;
          break;
        case 5:
          if (!(e.state.path === "/logout")) {
            _context.next = 10;
            break;
          }
          changeActiveButton("/login");
          _context.next = 9;
          return _utils_router_js__WEBPACK_IMPORTED_MODULE_6__["default"].go("/login", e.state.title, null, false);
        case 9:
          return _context.abrupt("return");
        case 10:
          if (!(e.state.path.includes("/player/") || e.state.path.includes("/film/") || e.state.path.includes("/actor/"))) {
            _context.next = 14;
            break;
          }
          _context.next = 13;
          return _utils_router_js__WEBPACK_IMPORTED_MODULE_6__["default"].go(e.state.path, e.state.title, null, false);
        case 13:
          return _context.abrupt("return");
        case 14:
          changeActiveButton(e.state.path);
          _context.next = 17;
          return _utils_router_js__WEBPACK_IMPORTED_MODULE_6__["default"].go(e.state.path, e.state.title, null, false);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var handleLocation = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var path;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          path = window.location.pathname;
          _context2.next = 3;
          return _utils_router_js__WEBPACK_IMPORTED_MODULE_6__["default"].go(decodeURIComponent(path), document.title);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function handleLocation() {
    return _ref2.apply(this, arguments);
  };
}();
handleLocation();
Handlebars.registerHelper("stars", function (averageScore) {
  averageScore = 4.4;
  var roundedScore = Math.floor(averageScore);
  var remainder = averageScore - roundedScore;
  var starsHTML = (0,_components_renderStarsRating_js__WEBPACK_IMPORTED_MODULE_8__.renderStarsRating)(roundedScore, remainder);
  return new Handlebars.SafeString(starsHTML);
});
function showOfflineModal() {
  var modalHtml = "\n    <div class=\"offline-background\">\n      <div id=\"offline-modal\">\n        <p>\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0443. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0432\u043E\u0435 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435.</p>\n        <a onclick=\"window.location.reload()\">\u041F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443</a>\n      </div>\n    </div>\n  ";
  document.body.insertAdjacentHTML("beforeend", modalHtml);
}
function hideOfflineModal() {
  var offlineModal = document.getElementsByClassName("offline-background")[0];
  if (offlineModal) {
    offlineModal.remove();
  }
}
window.addEventListener("offline", function () {
  showOfflineModal();
});
window.addEventListener("online", function () {
  hideOfflineModal();
});
if (!navigator.onLine) {
  showOfflineModal();
}
if (navigator.onLine) {
  hideOfflineModal();
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./src/utils/createLinks.js":
/*!**********************************!*\
  !*** ./src/utils/createLinks.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLink: () => (/* binding */ createLink)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var createLink = function createLink(_ref) {
  var href = _ref.href,
    text = _ref.text,
    key = _ref.key,
    classNames = _ref.classNames;
  var menuItem = document.createElement("a");
  menuItem.href = href;
  menuItem.textContent = text;
  menuItem.dataset.section = key;
  if (classNames) {
    if (Array.isArray(classNames)) {
      var _menuItem$classList;
      (_menuItem$classList = menuItem.classList).add.apply(_menuItem$classList, _toConsumableArray(classNames));
    } else {
      menuItem.classList.add(classNames);
    }
  }
  return menuItem;
};

/***/ }),

/***/ "./src/utils/router.js":
/*!*****************************!*\
  !*** ./src/utils/router.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Router: () => (/* binding */ Router),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Films_films_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Films/films.js */ "./src/components/Films/films.js");
/* harmony import */ var _components_Signup_signup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Signup/signup.js */ "./src/components/Signup/signup.js");
/* harmony import */ var _components_Player_player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Player/player.js */ "./src/components/Player/player.js");
/* harmony import */ var _components_Film_film_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Film/film.js */ "./src/components/Film/film.js");
/* harmony import */ var _components_Login_login_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Login/login.js */ "./src/components/Login/login.js");
/* harmony import */ var _components_Profile_profile_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Profile/profile.js */ "./src/components/Profile/profile.js");
/* harmony import */ var _components_Actor_actor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Actor/actor.js */ "./src/components/Actor/actor.js");
/* harmony import */ var _components_Logout_logout_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Logout/logout.js */ "./src/components/Logout/logout.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../index.js */ "./src/index.js");
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Films_films_js__WEBPACK_IMPORTED_MODULE_0__, _components_Signup_signup_js__WEBPACK_IMPORTED_MODULE_1__, _components_Player_player_js__WEBPACK_IMPORTED_MODULE_2__, _components_Film_film_js__WEBPACK_IMPORTED_MODULE_3__, _components_Login_login_js__WEBPACK_IMPORTED_MODULE_4__, _components_Profile_profile_js__WEBPACK_IMPORTED_MODULE_5__, _components_Actor_actor_js__WEBPACK_IMPORTED_MODULE_6__, _components_Logout_logout_js__WEBPACK_IMPORTED_MODULE_7__, _index_js__WEBPACK_IMPORTED_MODULE_8__]);
([_components_Films_films_js__WEBPACK_IMPORTED_MODULE_0__, _components_Signup_signup_js__WEBPACK_IMPORTED_MODULE_1__, _components_Player_player_js__WEBPACK_IMPORTED_MODULE_2__, _components_Film_film_js__WEBPACK_IMPORTED_MODULE_3__, _components_Login_login_js__WEBPACK_IMPORTED_MODULE_4__, _components_Profile_profile_js__WEBPACK_IMPORTED_MODULE_5__, _components_Actor_actor_js__WEBPACK_IMPORTED_MODULE_6__, _components_Logout_logout_js__WEBPACK_IMPORTED_MODULE_7__, _index_js__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }









var Router = /*#__PURE__*/function () {
  function Router() {
    _classCallCheck(this, Router);
    this.routs = {
      "/": _components_Films_films_js__WEBPACK_IMPORTED_MODULE_0__.renderFilms,
      "/signup": _components_Signup_signup_js__WEBPACK_IMPORTED_MODULE_1__.renderSignup,
      "/login": _components_Login_login_js__WEBPACK_IMPORTED_MODULE_4__.renderLogin,
      "/logout": _components_Logout_logout_js__WEBPACK_IMPORTED_MODULE_7__.renderLogout
    };
  }
  return _createClass(Router, [{
    key: "goToHomePage",
    value: function goToHomePage() {
      var state = {};
      state.path = "/";
      state.title = "Netrunnerflix";
      document.title = state.title;
      window.history.pushState(state, state.title, state.path);
      (0,_components_Films_films_js__WEBPACK_IMPORTED_MODULE_0__.renderFilms)();
    }
  }, {
    key: "goToSignupPage",
    value: function goToSignupPage() {
      var state = {};
      state.path = "/signup";
      state.title = "Регистрация";
      document.title = state.title;
      window.history.pushState(state, state.title, state.path);
      (0,_components_Signup_signup_js__WEBPACK_IMPORTED_MODULE_1__.renderSignup)();
    }
  }, {
    key: "goToLoginPage",
    value: function goToLoginPage() {
      var state = {};
      state.path = "/login";
      state.title = "Вход";
      document.title = state.title;
      window.history.pushState(state, state.title, state.path);
      (0,_components_Login_login_js__WEBPACK_IMPORTED_MODULE_4__.renderLogin)();
    }
  }, {
    key: "goToLogout",
    value: function goToLogout() {
      var state = {};
      state.path = "/logout";
      state.title = "Netrunnerflix";
      document.title = state.title;
      window.history.pushState(state, state.title, state.path);
      (0,_components_Logout_logout_js__WEBPACK_IMPORTED_MODULE_7__.renderLogout)();
    }
  }, {
    key: "goToActorPage",
    value: function goToActorPage(uuid, title) {
      var state = {};
      state.path = "/actor/".concat(uuid);
      state.title = title;
      document.title = state.title;
      window.history.pushState(state, state.title, state.path);
      (0,_components_Actor_actor_js__WEBPACK_IMPORTED_MODULE_6__.renderActorPage)(uuid);
    }
  }, {
    key: "goToFilmPage",
    value: function goToFilmPage(uuid, title) {
      var state = {};
      state.path = "/film/".concat(uuid);
      state.title = title;
      document.title = state.title;
      window.history.pushState(state, state.title, state.path);
      (0,_components_Film_film_js__WEBPACK_IMPORTED_MODULE_3__.renderFilmPage)(uuid);
    }
  }, {
    key: "goToProfilePage",
    value: function goToProfilePage() {
      var state = {};
      state.path = "/profile";
      state.title = "Профиль";
      document.title = state.title;
      var uuid = (0,_index_js__WEBPACK_IMPORTED_MODULE_8__.getCookie)("user_uuid");
      window.history.pushState(state, state.title, state.path);
      (0,_components_Profile_profile_js__WEBPACK_IMPORTED_MODULE_5__.renderProfile)(uuid);
    }
  }, {
    key: "goToPlayerPage",
    value: function goToPlayerPage(uuid, title, link) {
      var state = {};
      state.path = "/film/".concat(uuid);
      state.title = title;
      document.title = state.title;
      window.history.pushState(state, state.title, state.path);
      (0,_components_Player_player_js__WEBPACK_IMPORTED_MODULE_2__.renderPlayer)(uuid, title, link);
    }
  }, {
    key: "go",
    value: function () {
      var _go = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(path, title) {
        var data,
          needPush,
          state,
          func,
          uuid,
          _uuid,
          _uuid2,
          _uuid3,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              data = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
              needPush = _args.length > 3 && _args[3] !== undefined ? _args[3] : true;
              state = {};
              state.path = path;
              state.title = title;
              if (needPush) {
                window.history.pushState(state, state.title, path);
              }
              document.title = title;
              func = this.routs[path];
              if (!(func === undefined)) {
                _context.next = 37;
                break;
              }
              if (!path.includes("/actor/")) {
                _context.next = 14;
                break;
              }
              uuid = path.substring("/actor/".length, path.length);
              (0,_components_Actor_actor_js__WEBPACK_IMPORTED_MODULE_6__.renderActorPage)(uuid);
              _context.next = 35;
              break;
            case 14:
              if (!path.includes("/film/")) {
                _context.next = 20;
                break;
              }
              _uuid = path.substring("/film/".length, path.length);
              _context.next = 18;
              return (0,_components_Film_film_js__WEBPACK_IMPORTED_MODULE_3__.renderFilmPage)(_uuid);
            case 18:
              _context.next = 35;
              break;
            case 20:
              if (!path.includes("/player/")) {
                _context.next = 26;
                break;
              }
              _uuid2 = path.substring("/player/".length, path.length);
              _context.next = 24;
              return (0,_components_Player_player_js__WEBPACK_IMPORTED_MODULE_2__.renderPlayer)(_uuid2, title, data);
            case 24:
              _context.next = 35;
              break;
            case 26:
              if (!path.includes("/profile")) {
                _context.next = 33;
                break;
              }
              _uuid3 = (0,_index_js__WEBPACK_IMPORTED_MODULE_8__.getCookie)("user_uuid");
              (0,_index_js__WEBPACK_IMPORTED_MODULE_8__.changeActiveButton)("/profile");
              _context.next = 31;
              return (0,_components_Profile_profile_js__WEBPACK_IMPORTED_MODULE_5__.renderProfile)(_uuid3);
            case 31:
              _context.next = 35;
              break;
            case 33:
              _context.next = 35;
              return this.go("/", "Netrunnerflix", true);
            case 35:
              _context.next = 38;
              break;
            case 37:
              func();
            case 38:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function go(_x, _x2) {
        return _go.apply(this, arguments);
      }
      return go;
    }()
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Router());
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ "./src/utils/timeConvert.js":
/*!**********************************!*\
  !*** ./src/utils/timeConvert.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatTime: () => (/* binding */ formatTime),
/* harmony export */   timeConvert: () => (/* binding */ timeConvert)
/* harmony export */ });
var timeConvert = {
  /**
   * Конвертирует время из секунд в часы.
   * @function
   * @private
   * @param {number} durationInSec - Длительность времени в секундах.
   * @return {number} - Длительность времени в часах.
   */
  intoHours: function intoHours(durationInSec) {
    return _intoHours(durationInSec);
  },
  /**
   * Конвертирует время из секунд в минуты.
   * @function
   * @private
   * @param {number} durationInSec - Длительность времени в секундах.
   * @return {number} - Длительность времени в минутах.
   */
  intoMinutes: function intoMinutes(durationInSec) {
    return _intoMinutes(durationInSec);
  },
  /**
   * Форматирует время в текстовый формат (часы и минуты).
   * @function
   * @private
   * @param {number} durationInSec - Длительность времени в секундах.
   * @return {string} - Текстовое представление времени в формате "часы минуты".
   */
  timeIntoText: function timeIntoText(durationInSec) {
    return _timeIntoText(durationInSec);
  },
  /**
   * Форматирует полную дату в год
   * @private
   * @param {string} rawDate - Полная дата в виде строки
   * @return {string} - значение года
   */
  dateIntoYear: function dateIntoYear(rawDate) {
    return _dateIntoYear(rawDate);
  }
};
var _intoHours = function _intoHours(durationInSec) {
  return Math.floor(durationInSec / 3600);
};
var _intoMinutes = function _intoMinutes(durationInSec) {
  return Math.floor(durationInSec % 3600 / 60);
};
var _timeIntoText = function _timeIntoText(durationInSec) {
  var hours = Math.floor(durationInSec / 3600);
  var minutes = Math.floor(durationInSec % 3600 / 60);
  if (!hours) {
    return "".concat(minutes, "\u043C\u0438\u043D");
  }
  if (!minutes) {
    return "".concat(hours, "\u0447");
  }
  return "".concat(hours, "\u0447 ").concat(minutes, "\u043C\u0438\u043D");
};
var formatTime = function formatTime(time) {
  var seconds = Math.floor(time % 60);
  var minutes = Math.floor(time / 60) % 60;
  var hours = Math.floor(time / 3600);
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  hours = hours < 10 ? "0" + hours : hours;
  if (!hours) {
    return "".concat(minutes, ":").concat(seconds);
  }
  return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
};
var _dateIntoYear = function _dateIntoYear(rawDate) {
  return rawDate.substring(0, 4);
};

/***/ }),

/***/ "./src/utils/transformers/filmDataWithDuration.js":
/*!********************************************************!*\
  !*** ./src/utils/transformers/filmDataWithDuration.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fixUserData: () => (/* binding */ fixUserData),
/* harmony export */   toFilmDataWithDuration: () => (/* binding */ toFilmDataWithDuration)
/* harmony export */ });
/* harmony import */ var _timeConvert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../timeConvert.js */ "./src/utils/timeConvert.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var toFilmDataWithDuration = function toFilmDataWithDuration(filmData) {
  return filmData.map(function (film) {
    return _objectSpread(_objectSpread({}, film), {}, {
      duration: _timeConvert_js__WEBPACK_IMPORTED_MODULE_0__.timeConvert.timeIntoText(film.duration)
    });
  });
};
var fixUserData = function fixUserData(data) {
  var userData = _objectSpread({}, data);
  userData.registeredAt = _timeConvert_js__WEBPACK_IMPORTED_MODULE_0__.timeConvert.dateIntoYear(userData.registeredAt);
  return userData;
};

/***/ }),

/***/ "./src/utils/validate.js":
/*!*******************************!*\
  !*** ./src/utils/validate.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validators: () => (/* binding */ validators)
/* harmony export */ });
var validators = {
  /**
   * Проверка валидности почты
   * @function
   * @param {string} login - почта
   * @return {boolean} - флаг правильности почты
   */
  login: function login() {
    var _login = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return validateEmail(_login);
  },
  /**
   * Проверка валидности имени пользователя
   * @function
   * @param {string} username - имя пользователя
   * @return {boolean} - флаг правильности имени пользователя
   */
  username: function username(_username) {
    return validateUsername(_username);
  },
  /**
   * Проверка валидности пароля
   * @function
   * @param {string} password - пароль
   * @return {boolean} - флаг правильности пароля
   */
  password: function password(_password) {
    return validatePassword(_password);
  },
  /**
   * Проверка ввода подтверждения пароля, совпадающего с паролем
   * @function
   * @param {string} password - Пароль
   * @param {string} passConf - подтверждение пароля
   * @return {boolean} - флаг правильности почты
   */
  passwordConf: function passwordConf(password, passConf) {
    return _passwordConf(password, passConf);
  }
};
var MIN_USERNAME_LENGTH = 4;
var MIN_PASSW_LENGTH = 6;
var loginRegular = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
var validateEmail = function validateEmail() {
  var email = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return loginRegular.test(email);
};
var validateUsername = function validateUsername(username) {
  return username.length >= MIN_USERNAME_LENGTH;
};
var validatePassword = function validatePassword(password) {
  return password.length >= MIN_PASSW_LENGTH;
};
var _passwordConf = function _passwordConf(password, passConf) {
  return password === passConf;
};

/***/ }),

/***/ "./src/components/Actor/actor.hbs":
/*!****************************************!*\
  !*** ./src/components/Actor/actor.hbs ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"film-card\" data-film-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"uuid") : depth0), depth0))
    + "\">\n                <img class=\"film-image\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"preview_data") : depth0), depth0))
    + "\">\n                <div class=\"film-content\">\n                    <div class=\"film-time\">\n                        <img class=\"time-icon\" src=\"./icons/time.svg\">\n                        "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"duration") : depth0), depth0))
    + "\n                    </div>\n                    <div class=\"film-rating\">\n"
    + ((stack1 = (lookupProperty(helpers,"stars")||(depth0 && lookupProperty(depth0,"stars"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"average_score") : depth0),{"name":"stars","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":51,"column":24},"end":{"line":55,"column":34}}})) != null ? stack1 : "")
    + "                        <span class=\"rating-count\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"scores_count") : depth0), depth0))
    + "</span>\n                    </div>\n                </div>\n            </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                            <div class=\"star-container\">\n                                <div class=\"star\"></div>\n                            </div>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"actor-info\">\n    <div class=\"actor-photo\">\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"avatar") || (depth0 != null ? lookupProperty(depth0,"avatar") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"avatar","hash":{},"data":data,"loc":{"start":{"line":3,"column":18},"end":{"line":3,"column":30}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":37},"end":{"line":3,"column":47}}}) : helper)))
    + "\">\n    </div>\n    <div class=\"actor-details\">\n        <div class=\"actor-name\">\n            <h1>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":26}}}) : helper)))
    + "</h1>\n        </div>\n        <div class=\"actor-description\">\n            <h1>Об актере</h1>\n            <ul>\n                <li>Карьера: "
    + alias4(((helper = (helper = lookupProperty(helpers,"career") || (depth0 != null ? lookupProperty(depth0,"career") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"career","hash":{},"data":data,"loc":{"start":{"line":12,"column":29},"end":{"line":12,"column":41}}}) : helper)))
    + "</li>\n                <li>Рост: "
    + alias4(((helper = (helper = lookupProperty(helpers,"height") || (depth0 != null ? lookupProperty(depth0,"height") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"height","hash":{},"data":data,"loc":{"start":{"line":13,"column":26},"end":{"line":13,"column":38}}}) : helper)))
    + "</li>\n                <li>Дата рождения: "
    + alias4(((helper = (helper = lookupProperty(helpers,"birthday") || (depth0 != null ? lookupProperty(depth0,"birthday") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"birthday","hash":{},"data":data,"loc":{"start":{"line":14,"column":35},"end":{"line":14,"column":49}}}) : helper)))
    + "</li>\n                <li>Место рождения: "
    + alias4(((helper = (helper = lookupProperty(helpers,"birthPlace") || (depth0 != null ? lookupProperty(depth0,"birthPlace") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"birthPlace","hash":{},"data":data,"loc":{"start":{"line":15,"column":36},"end":{"line":15,"column":52}}}) : helper)))
    + "</li>\n                <li>Жанры: "
    + alias4(((helper = (helper = lookupProperty(helpers,"genres") || (depth0 != null ? lookupProperty(depth0,"genres") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"genres","hash":{},"data":data,"loc":{"start":{"line":16,"column":27},"end":{"line":16,"column":39}}}) : helper)))
    + "</li>\n                <li>Супруга: "
    + alias4(((helper = (helper = lookupProperty(helpers,"spouse") || (depth0 != null ? lookupProperty(depth0,"spouse") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"spouse","hash":{},"data":data,"loc":{"start":{"line":17,"column":29},"end":{"line":17,"column":41}}}) : helper)))
    + "</li>\n            </ul>\n        </div>\n    </div>\n</div>\n\n<div class=\"films-section\">\n    <div class=\"upper-block\">\n        <div class=\"popular-now-title\">Фильмы с этим актером</div>\n        <div class=\"slider-buttons\">\n            <button class=\"carousel-button prev\" data-carousel-button=\"prev\"><img src=\"./icons/arrow.svg\"\n                                                                                  alt=\"\">\n            </button>\n            <div class=\"carousel-shapes\">\n                <img src=\"./icons/shape.svg\" alt=\"\">\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\n            </div>\n            <button class=\"carousel-button next\" data-carousel-button=\"next\"><img src=\"./icons/arrow.svg\"\n                                                                                  alt=\"\">\n            </button>\n        </div>\n    </div>\n    <div class=\"films-container\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"filmsData") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":8},"end":{"line":60,"column":17}}})) != null ? stack1 : "")
    + "    </div>\n</div>\n";
},"useData":true});

/***/ }),

/***/ "./src/components/Film/Film.hbs":
/*!**************************************!*\
  !*** ./src/components/Film/Film.hbs ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"actor-preview\" data-actor-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"uuid") : depth0), depth0))
    + "\">\r\n                    <img class=\"actor-avatar\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"avatar") : depth0), depth0))
    + "\">\r\n                    <div class=\"dropdown-actor-name\"> "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + " </div>\r\n                </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"film-page-poster-block\">\r\n    <div class=\"film-page-image-div\">\r\n        <img class=\"film-page-image\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"preview") || (depth0 != null ? lookupProperty(depth0,"preview") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"preview","hash":{},"data":data,"loc":{"start":{"line":3,"column":42},"end":{"line":3,"column":55}}}) : helper)))
    + "\">\r\n        <div class=\"film-overlay\"></div>\r\n    </div>\r\n    <div class=\"film-page-poster-data\">\r\n        <div class=\"film-page-text-data\">\r\n            <h1>"
    + alias4(((helper = (helper = lookupProperty(helpers,"title") || (depth0 != null ? lookupProperty(depth0,"title") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data,"loc":{"start":{"line":8,"column":16},"end":{"line":8,"column":27}}}) : helper)))
    + "</h1>\r\n            <a> "
    + alias4(((helper = (helper = lookupProperty(helpers,"data") || (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"data","hash":{},"data":data,"loc":{"start":{"line":9,"column":16},"end":{"line":9,"column":26}}}) : helper)))
    + " </a>\r\n        </div>\r\n        <div class=\"film-page-poster-actions\">\r\n            <div class=\"accent-button\" id=\"#data-player-button\">\r\n                <link>\r\n                Смотреть! </link>\r\n            </div>\r\n            <div class=\"film-page-buttons\">\r\n                <link>\r\n                Лайкнуть </link>\r\n            </div>\r\n            <div class=\"film-page-buttons\">\r\n                <link>\r\n                Смотреть позже </link>\r\n            </div>\r\n            <a class=\"film-page-duration\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"duration") || (depth0 != null ? lookupProperty(depth0,"duration") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"duration","hash":{},"data":data,"loc":{"start":{"line":24,"column":43},"end":{"line":24,"column":57}}}) : helper)))
    + " </a>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"film-content-block\">\r\n    <div class=\"film-page-left\">\r\n        <div class=\"film-page-description\">\r\n            <a class=\"sub_title\">Описание</a>\r\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"data") || (depth0 != null ? lookupProperty(depth0,"data") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"data","hash":{},"data":data,"loc":{"start":{"line":33,"column":15},"end":{"line":33,"column":25}}}) : helper)))
    + "</p>\r\n        </div>\r\n        <div class=\"film-page-actors\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"filmActors") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":36,"column":12},"end":{"line":41,"column":21}}})) != null ? stack1 : "")
    + "        </div>\r\n\r\n    </div>\r\n\r\n    <div class=\"film-page-data\">\r\n        <div class=\"film-page-data-section\">\r\n            <a class=\"sub_title\">Дата выхода</a>\r\n            <div class=\"film-page-data-element\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":49,"column":48},"end":{"line":49,"column":58}}}) : helper)))
    + "</div>\r\n        </div>\r\n        <div class=\"film-page-data-section\">\r\n            <a class=\"sub_title\">Возрастной рейтинг</a>\r\n            <div class=\"film-page-data-element\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"ageLimit") || (depth0 != null ? lookupProperty(depth0,"ageLimit") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ageLimit","hash":{},"data":data,"loc":{"start":{"line":53,"column":49},"end":{"line":53,"column":63}}}) : helper)))
    + "+</div>\r\n        </div>\r\n        <div class=\"film-page-data-section\">\r\n            <a class=\"sub_title\">Рейтинг</a>\r\n            <div class=\"film-page-data-element\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"averageScore") || (depth0 != null ? lookupProperty(depth0,"averageScore") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"averageScore","hash":{},"data":data,"loc":{"start":{"line":57,"column":49},"end":{"line":57,"column":67}}}) : helper)))
    + " </div>\r\n        </div>\r\n        <div class=\"film-page-data-section\">\r\n            <a class=\"sub_title\">Режиссеры</a>\r\n            <div class=\"film-page-data-element\"> "
    + alias4(((helper = (helper = lookupProperty(helpers,"director") || (depth0 != null ? lookupProperty(depth0,"director") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"director","hash":{},"data":data,"loc":{"start":{"line":61,"column":49},"end":{"line":61,"column":63}}}) : helper)))
    + " </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./src/components/Films/Films.hbs":
/*!****************************************!*\
  !*** ./src/components/Films/Films.hbs ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <li class=\"slide\" "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"active") : depth0), depth0))
    + ">\r\n                <div class=\"poster-block\">\r\n                    <div class=\"image-div\">\r\n                        <img class=\"poster-image\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"preview_data") : depth0), depth0))
    + "\">\r\n                        <div class=\"film-overlay\"></div>\r\n                    </div>\r\n                    <div class=\"poster-data\">\r\n                        <div class=\"text-data\">\r\n                            <h1>"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "</h1>\r\n                            <a> "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"film_data") : depth0), depth0))
    + " </a>\r\n                        </div>\r\n                        <div class=\"poster-actions\">\r\n                            <div class=\"accent-button\" id=\"data-player-button\">\r\n                                <link>\r\n                                Смотреть! </link>\r\n                            </div>\r\n                            <div class=\"poster-buttons\">\r\n                                <link>\r\n                                Лайкнуть </link>\r\n                            </div>\r\n                            <div class=\"poster-buttons\">\r\n                                <link>\r\n                                Смотреть позже </link>\r\n                            </div>\r\n                            <a class=\"poster-duration\"> "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"duration") : depth0), depth0))
    + " </a>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"genre-card\">\r\n                <div class=\"genre-images\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"posters") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":20},"end":{"line":66,"column":29}}})) != null ? stack1 : "")
    + "                </div>\r\n                <div class=\"genre-images-overlay\"></div>\r\n                <div class=\"genre-content\">\r\n                    <div class=\"genre-name\">\r\n                        "
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"name") : depth0), depth0))
    + "\r\n                    </div>\r\n                </div>\r\n            </div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                        <img class=\"genre-image\" src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\">\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"film-card\" data-film-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"uuid") : depth0), depth0))
    + "\" data-film-title=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "\">\r\n                <img class=\"film-image\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"preview_data") : depth0), depth0))
    + "\">\r\n                <div class=\"film-content\">\r\n                    <div class=\"film-time\">\r\n                        <img class=\"time-icon\" src=\"./icons/time.svg\">\r\n                        "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"duration") : depth0), depth0))
    + "\r\n                    </div>\r\n                    <div class=\"film-rating\">\r\n\r\n                        <span class=\"rating-count\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"scores_count") : depth0), depth0))
    + "</span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"film-card\" data-film-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"uuid") : depth0), depth0))
    + "\" data-film-title=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "\">\r\n                <img class=\"film-image\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"preview_data") : depth0), depth0))
    + "\">\r\n                <div class=\"film-content\">\r\n                    <div class=\"film-time\">\r\n                        <img class=\"time-icon\" src=\"./icons/time.svg\">\r\n                        "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"duration") : depth0), depth0))
    + "\r\n                    </div>\r\n                    <div class=\"film-rating\">\r\n                        <span class=\"rating-count\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"scores_count") : depth0), depth0))
    + "</span>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"carousel poster-carousel\" data-carousel>\r\n    <button class=\"poster-carousel-button prev\" data-carousel-button=\"prev\"><img src=\"./icons/arrow.svg\" alt=\"\">\r\n    </button>\r\n    <button class=\"poster-carousel-button next\" data-carousel-button=\"next\"><img src=\"./icons/arrow.svg\" alt=\"\">\r\n    </button>\r\n    <ul data-slides>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"topFourFilms") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":37,"column":17}}})) != null ? stack1 : "")
    + "    </ul>\r\n</div>\r\n\r\n<div class=\"films-section\">\r\n    <div class=\"films-text\">Фильмы</div>\r\n    <div class=\"first-upper-block\">\r\n        <div class=\"popular-now-title\">Жанры</div>\r\n        <div class=\"slider-buttons\">\r\n            <button class=\"carousel-button prev\" data-carousel-button=\"prev\"><img src=\"./icons/arrow.svg\"\r\n                                                                                  alt=\"\">\r\n            </button>\r\n            <div class=\"carousel-shapes\">\r\n                <img src=\"./icons/shape.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n            </div>\r\n            <button class=\"carousel-button next\" data-carousel-button=\"next\"><img src=\"./icons/arrow.svg\"\r\n                                                                                  alt=\"\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <div class=\"genres-container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"filmsGenres") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":61,"column":8},"end":{"line":75,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"upper-block\">\r\n        <div class=\"popular-now-title\">Популярно сейчас</div>\r\n        <div class=\"slider-buttons\">\r\n            <button class=\"carousel-button prev\" data-carousel-button=\"prev\"><img src=\"./icons/arrow.svg\"\r\n                                                                                  alt=\"\">\r\n            </button>\r\n            <div class=\"carousel-shapes\">\r\n                <img src=\"./icons/shape.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n            </div>\r\n            <button class=\"carousel-button next\" data-carousel-button=\"next\"><img src=\"./icons/arrow.svg\"\r\n                                                                                  alt=\"\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <div class=\"films-container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"filmData") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":95,"column":8},"end":{"line":109,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"upper-block\">\r\n        <div class=\"popular-now-title\">Новые релизы</div>\r\n        <div class=\"slider-buttons\">\r\n            <button class=\"carousel-button prev\" data-carousel-button=\"prev\"><img src=\"./icons/arrow.svg\"\r\n                                                                                  alt=\"\">\r\n            </button>\r\n            <div class=\"carousel-shapes\">\r\n                <img src=\"./icons/shape.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n            </div>\r\n            <button class=\"carousel-button next\" data-carousel-button=\"next\"><img src=\"./icons/arrow.svg\"\r\n                                                                                  alt=\"\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <div class=\"films-container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"filmData") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":129,"column":8},"end":{"line":143,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"upper-block\">\r\n        <div class=\"popular-now-title\">Советуем посмотреть</div>\r\n        <div class=\"slider-buttons\">\r\n            <button class=\"carousel-button prev\" data-carousel-button=\"prev\"><img src=\"./icons/arrow.svg\"\r\n                                                                                  alt=\"\">\r\n            </button>\r\n            <div class=\"carousel-shapes\">\r\n                <img src=\"./icons/shape.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n                <img src=\"./icons/shape-none.svg\" alt=\"\">\r\n            </div>\r\n            <button class=\"carousel-button next\" data-carousel-button=\"next\"><img src=\"./icons/arrow.svg\"\r\n                                                                                  alt=\"\">\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <div class=\"films-container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"filmData") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":163,"column":8},"end":{"line":176,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./src/components/Login/Login.hbs":
/*!****************************************!*\
  !*** ./src/components/Login/Login.hbs ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"form-section\">\n    <div class=\"error-login\" id=\"login-errors\"></div>\n    <input type=\"email\" name=\"email\" placeholder=\"Почта\">\n    <input type=\"password\" name=\"password\" placeholder=\"Пароль\">\n    <input type=\"submit\" class=\"submit-button\" value=\"Войти!\">\n</form>\n";
},"useData":true});

/***/ }),

/***/ "./src/components/Menu/Menu.hbs":
/*!**************************************!*\
  !*** ./src/components/Menu/Menu.hbs ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <a class=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"className") : depth0), depth0))
    + "\" href=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"href") : depth0), depth0))
    + "\" data-section=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"key") : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"text") : depth0), depth0))
    + "</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"menu-container\">\r\n    <div class=\"logo\">\r\n        <img src=\"./logo/logo.svg\" alt=\"Логотип\">\r\n    </div>\r\n    <div class=\"menu\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"items") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":8,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"menu-right\">\r\n      <div class=\"icons\">\r\n          <div class=\"nav-icon\">\r\n              <img src=\"./icons/search.svg\" alt=\"Логотип\">\r\n          </div>\r\n          <div class=\"nav-icon\">\r\n              <img src=\"./icons/notifications.svg\" alt=\"Логотип\">\r\n          </div>\r\n      <div id=\"auth\"></div>\r\n    </div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./src/components/Player/Player.hbs":
/*!******************************************!*\
  !*** ./src/components/Player/Player.hbs ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"player-container show-controls\">\n    <div class=\"wrapper\">\n        <div class=\"video-timeline\">\n            <div class=\"progress-area\">\n                <span>00:00</span>\n                <div class=\"progress-bar\"></div>\n            </div>\n        </div>\n        <ul class=\"video-controls\">\n            <li class=\"options left\">\n                <button class=\"volume\">\n                    <img src=\"./icons/sound-max.svg\" alt=\"Громкость\">\n                </button>\n                <input class=\"volume-range\" type=\"range\" min=\"0\" max=\"1\" step=\"any\">\n                <div class=\"video-timer\">\n                    <p class=\"current-time\">00:00</p>\n                    <p class=\"separator\"> / </p>\n                    <p class=\"video-duration\">00:00</p>\n                </div>\n            </li>\n            <li class=\"options center\">\n                <button class=\"skip-backward\">\n                    <img src=\"./icons/next.svg\" class=\"backward\" alt=\"Вперед\">\n                </button>\n                <button class=\"play-pause\">\n                    <img src=\"./icons/play.svg\" alt=\"Пауза\">\n                </button>\n                <button class=\"skip-forward\">\n                    <img src=\"./icons/next.svg\" alt=\"Назад\">\n                </button>\n            </li>\n            <li class=\"options right\">\n                <div class=\"playback-content\">\n                    <button class=\"playback-speed\">\n                        <span class=\"material-symbols-rounded\">\n                            <img src=\"./icons/speed.svg\" class=\"speed-img\" alt=\"Скорость воспроизведения\">\n                        </span>\n                    </button>\n                    <ul class=\"speed-options\">\n                        <li data-speed=\"2\">2x</li>\n                        <li data-speed=\"1.5\">1.5x</li>\n                        <li data-speed=\"1\" class=\"active\">Обычная</li>\n                        <li data-speed=\"0.75\">0.75x</li>\n                        <li data-speed=\"0.5\">0.5x</li>\n                    </ul>\n                </div>\n                <button class=\"pic-in-pic\">\n                    <span class=\"material-icons\">\n                        <img src=\"./icons/pict-in-alt.svg\" alt=\"Окно в окне\">\n                    </span>\n                </button>\n                <button class=\"fullscreen\">\n                    <img src=\"./icons/fullscreen.svg\" alt=\"Полный экран\">\n                </button>\n            </li>\n        </ul>\n    </div>\n    <video>\n        <source src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? lookupProperty(depth0,"src") : depth0), depth0))
    + "\">\n    </video>\n</div>\n<button type=\"button\" id=\"exit-player\" class=\"profile-page-buttons\">Назад</button>\n";
},"useData":true});

/***/ }),

/***/ "./src/components/Profile/Profile.hbs":
/*!********************************************!*\
  !*** ./src/components/Profile/Profile.hbs ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"film-card\" data-film-id=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"uuid") : depth0), depth0))
    + "\" data-film-title=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "\">\r\n                <img class=\"film-image\" src=\""
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"preview_data") : depth0), depth0))
    + "\">\r\n                <div class=\"film-content\">\r\n                    <div class=\"film-title\">\r\n                        "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"title") : depth0), depth0))
    + "\r\n                    </div>\r\n                    <div class=\"film-time\">\r\n                        "
    + alias2(alias1((depth0 != null ? lookupProperty(depth0,"duration") : depth0), depth0))
    + "\r\n                    </div>\r\n                </div>\r\n            </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"profile-info\">\r\n    <div class=\"profile-photo\">\r\n        <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"avatar") || (depth0 != null ? lookupProperty(depth0,"avatar") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"avatar","hash":{},"data":data,"loc":{"start":{"line":3,"column":18},"end":{"line":3,"column":30}}}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":3,"column":37},"end":{"line":3,"column":51}}}) : helper)))
    + "\">\r\n    </div>\r\n    <div class=\"profile-details\">\r\n        <div class=\"profile-top\">\r\n            <h1>"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":30}}}) : helper)))
    + "</h1>\r\n            <a class=\"profile-page-buttons\" id=\"edit-button\" href=\"/edit\"> Редактировать </a>\r\n        </div>\r\n        <div class=\"profile-description\">\r\n            <h1>О пользователе</h1>\r\n            <ul>\r\n                <li>Почта: "
    + alias4(((helper = (helper = lookupProperty(helpers,"login") || (depth0 != null ? lookupProperty(depth0,"login") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"login","hash":{},"data":data,"loc":{"start":{"line":13,"column":27},"end":{"line":13,"column":38}}}) : helper)))
    + "</li>\r\n                <li>Дата регистрации: "
    + alias4(((helper = (helper = lookupProperty(helpers,"registeredAt") || (depth0 != null ? lookupProperty(depth0,"registeredAt") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"registeredAt","hash":{},"data":data,"loc":{"start":{"line":14,"column":38},"end":{"line":14,"column":56}}}) : helper)))
    + "</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<div class=\"films-section\">\r\n    <div class=\"films-container\">\r\n        <div class=\"popular-now-title\">Любимые фильмы</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"filmsData") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":23,"column":8},"end":{"line":35,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n</div>\r\n";
},"useData":true});

/***/ }),

/***/ "./src/components/Profile/editForm.hbs":
/*!*********************************************!*\
  !*** ./src/components/Profile/editForm.hbs ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "    <form id=\"myForm\">\n        <h1>Смена аватара</h1>\n        <div class=\"edit-section\">\n            <div class=\"edit-form\">\n                <div class=\"error-avatar\" id=\"avatar-errors\"></div>\n                <img id=\"avatarPreview\" src=\"#\" alt=\"Avatar Preview\" style=\"display:none; max-width: 200px; max-height: 200px;\">\n                <input type=\"file\" id=\"imageInput\" accept=\"image/*\" name=\"avatar\">\n            </div>\n            <button type=\"button\" id=\"sendImageBtn\" class=\"edit-form-button\">Сохранить</button>\n        </div>\n        <h1>Смена логина</h1>\n        <div class=\"edit-section\">\n            <div class=\"edit-form\">\n                <div class=\"error-username\" id=\"username-errors\"></div>\n                <input type=\"text\" id=\"loginInput\" placeholder=\"Введите логин\" name=\"username\">\n            </div>\n            <button type=\"button\" id=\"sendLoginBtn\" class=\"edit-form-button\">Сохранить</button>\n        </div>\n        <h1>Смена пароля</h1>\n        <div class=\"edit-section\">\n            <div class=\"edit-form\">\n                <div class=\"error-password\" id=\"password-errors\"></div>\n                <input type=\"password\" id=\"passwordInput\" placeholder=\"Введите пароль\" name=\"password\">\n                <input type=\"password\" id=\"confirmPasswordInput\" placeholder=\"Подтвердите пароль\", name=\"passConf\">\n            </div>\n            <button type=\"button\" id=\"sendPasswordBtn\" class=\"edit-form-button\">Сохранить</button>\n        </div>\n    </form>\n    <button type=\"button\" id=\"exit-editing-button\" class=\"profile-page-buttons\">Назад</button>\n";
},"useData":true});

/***/ }),

/***/ "./src/components/Signup/Signup.hbs":
/*!******************************************!*\
  !*** ./src/components/Signup/Signup.hbs ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Handlebars = __webpack_require__(/*! ../../../node_modules/handlebars/runtime.js */ "./node_modules/handlebars/runtime.js");
function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"form-section\">\n    <div class=\"error-signup\" id=\"signup-errors\"></div>\n    <input type=\"email\" placeholder=\"Почта\" name=\"email\">\n    <input type=\"text\" placeholder=\"Логин\" name=\"username\">\n    <input type=\"password\" placeholder=\"Пароль\" name=\"password\">\n    <input type=\"password\" placeholder=\"Подтвердить пароль\" name=\"passConf\">\n    <input type=\"submit\" class=\"submit-button\" value=\"Зарегистрироваться!\">\n</form>\n";
},"useData":true});

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.ddcabc98e13920664abf.js.map