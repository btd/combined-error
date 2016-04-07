var CE = require('.');

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
