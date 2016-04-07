# CombinedError

Zero dependencies error that allow to combine other errors in cause chains.
This is useful if you want to save original errors from other modules.

## Example
var CE = require('combined-error');

var err1 = new CE(new Error('boom'), 'something bad 1');

console.log(err1.stack);

try {
  try {
    throw new Error('boom');
  } catch(e) {
    throw new CE(e, 'something bad 2');
  }
} catch(e) {
  console.log(e.stack);
}

## Browsers

Tested in FF, Safari, Chrome, i do not have ability to test IE and Edge.

## Node.js

Just require it.

## License

MIT
