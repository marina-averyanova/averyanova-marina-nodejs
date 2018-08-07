const fn1 = () => {
  return Promise.resolve('t');
}

const fn2 = () => new Promise(resolve => {
  setTimeout(() => resolve('a'), 3000);
})

const fn3 = () => new Promise(resolve => {
  setTimeout(() => resolve('r'), 1000);
})

const fn4 = () => new Promise(resolve => {
  setTimeout(() => resolve('t'), 1000);
})

function promiseReduce(asyncFunctions, reducer, initialValue) {
  const getPromises = () => {
    let promises = [];
    asyncFunctions.forEach(function(fn) {
      promises.push(new Promise(function(resolve) {
        resolve((async function(fn) {
          return await fn();
        }(fn)));
      }));
    });
    return Promise.all(promises);
  }

  return new Promise(resolve => {
    getPromises()
      .then(function(results) {
        resolve(results.reduce(reducer, initialValue));
      });
  });
}

var promiseReduceResult = promiseReduce([fn1, fn2, fn3, fn4], function (memo, value) {
  console.log('reduce');
  return memo + value;
}, 's');

promiseReduceResult.then(
  function fulfilled(res) {
    console.log('promise reduce result', res, 'result is valid', res === 'start');
  }
);
