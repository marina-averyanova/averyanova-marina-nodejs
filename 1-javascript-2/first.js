const fn1 = () => {
        return Promise.resolve(1);
}

const fn2 = () => new Promise(resolve => {
  setTimeout(() => resolve(2), 3000);
})

const fn3 = () => new Promise(resolve => {
  setTimeout(() => resolve(3), 1000);
})

const fn4 = () => new Promise(resolve => {
  setTimeout(() => resolve(4), 1000);
})

function promiseReduce(asyncFunctions, reduce, initialValue) {
  let acc = initialValue;
  let counter = 0;

  return new Promise(resolve => {
    asyncFunctions.forEach(function(fn) {
      let resultPromise = new Promise(function(resolve) {
        resolve((async function(fn) {
          return await fn();
        }(fn)));
      });

      resultPromise.then(
        function fulfilled(res) {
          acc = reduce(acc, res);
          counter++;
          counter === asyncFunctions.length && resolve(acc);
        }
      );
    });
  });
}

var promiseReduceResult = promiseReduce([fn1, fn2, fn3, fn4], function (memo, value) {
  console.log('reduce');
  return memo + value;
}, 0);

promiseReduceResult.then(
  function fulfilled(res) {
    console.log('promise reduce result', res, 'result is valid', res === 10);
  }
);
