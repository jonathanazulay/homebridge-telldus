'use strict';

module.exports.bitsToPercentage = function(value) {
  value = value / 255;
  value = value * 100;
  value = Math.round(value);
  return value;
};

// Convert 0-100 to 0-255
module.exports.percentageToBits = function(value) {
  value = value * 255;
  value = value / 100;
  value = Math.round(value);
  return value;
};

module.exports.wait = ms => new Promise((resolve) => setTimeout(resolve, ms))

module.exports.retryPromise = (times, interval) => func => {
  return func()
  .catch(e => {
    if (times === 0) {
      throw e;
    } else {
      return module.exports.wait(interval).then(() =>
        module.exports.retryPromise(times - 1, interval)(func)
      );
    }
  })
};
