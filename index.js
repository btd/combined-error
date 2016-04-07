(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.CombinedError = factory();
  }
}(this, function() {
  'use strict';


  function CombinedError(cause, message) {
    this.cause = cause;
    this.message = message || '';
    Error.call(this);

    if(Error.captureStackTrace) { //V8
      Error.captureStackTrace(this, CombinedError);
    } else {
      try {
        throw new Error();
      } catch(e) {
        var stack = e.stack.split('\n');
        // remove line with CombinedError
        stack.shift();

        // add line with error name and message
        stack.unshift(this.name + ': ' + this.message);
        this.stack = stack.join('\n');
      }
    }

    Object.defineProperties(this, {
      _stack: {
        enumerable: false,
        value: this.stack
      },
      stack: {
        enumerable: false,
        get: function() {
          return this.fullStack();
        }
      }
    });
  }

  CombinedError.prototype = Object.create(Error.prototype);

  CombinedError.prototype.constructor = CombinedError;

  CombinedError.prototype.name = 'CError';

  CombinedError.prototype.fullStack = function() {
    var stack = this._stack;

    if(this.cause && this.cause instanceof Error) {
      stack += '\n';
      stack += 'Caused by:\n';
      stack += this.cause.stack;
    }

    return stack;
  };

  return CombinedError;
}));
