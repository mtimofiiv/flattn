# flattn

[![Travis](https://api.travis-ci.org/mtimofiiv/flatten.svg)](https://travis-ci.org/mtimofiiv/flatten)

There are lots of flattening libraries out there, but I decided to write my own because I wanted to write my own :)

Mainly, I wanted to write it in the latest ES6 that nodejs `6.x` gives us, with beautiful things like default params!

If you use this in a frontend project, make sure it gets transpiled!

## Getting started

```
npm install flattn
```

Then, in your JS file:

```js
const flattn = require('flattn');

const myCrazyDeepObject = {
  nested: {
    stuff: 'here'
  }
};

flattn(myCrazyDeepObject); // outputs a beautifully flat object
```

## Options

`flattn(object, {})` takes a couple optional params:

 * `crush` (array) - this will remove a nesting namespace from the final product (ie. if you crush `[ 'metadata' ]`, then `{ metadata: { hello: 'world' }}` will return `{ hello: 'world' }`)
 * `stringifyNull` (boolean) - this will turn `null`s into `''`
 * `separator` (string) - by default, this lib uses an underscore. But, if you want something else...
 * `pruneFunctions` (boolean) - if the value of a key is a function, then you can opt to not have those in the result
