'use strict';

const defaultOptions = {
  crush: [],
  stringifyNull: false,
  separator: '_',
  pruneFunctions: false
};

function _isObject(testMe) {
  if (testMe === null || typeof testMe === 'undefined') return false;
  return Object.getPrototypeOf(testMe) === Object.getPrototypeOf({});
}

function flatten(object, options = {}) {
  options = Object.assign({}, defaultOptions, options);

  // Plain types can just be returned as we don't need to flatten them
  if ([ 'string', 'number', 'boolean' ].indexOf(typeof object) > -1) return object;

  // We may, in some instances, want to return a string instead of a null when something is null
  if (object === null) return options.stringifyNull ? '' : null;

  // Dates should not be treated as objects
  if (object instanceof Date) return object;

  // If we've made it here, then prunFunctions is on
  if (typeof object === 'function') return object;

  let flattened = {};

  const prefix = options.stem && options.crush.indexOf(options.stem) === -1 ? `${options.stem}${options.separator}` : '';

  for (const param in object) {
    // If we are to prune functions, here is where we do it
    if (typeof object[param] === 'function' && options.pruneFunctions) continue;

    const keyName = `${prefix}${param}`;

    const flattenedValue = flatten(object[param], Object.assign({}, options, { stem: keyName }));

    const isObject = _isObject(object[param]);
    const isArray = Array.isArray(object[param]);

    const merge = isObject || isArray ? flattenedValue : { [keyName]: flattenedValue };

    flattened = Object.assign(flattened, merge);
  }

  return flattened;
}

module.exports = flatten;
