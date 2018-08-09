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

function promiseReduce(asyncFunctions, reduce, initialValue) {
  return new Promise(resolve => {
    const iterator = (index, previousResult) => {
      asyncFunctions[index]().then(res => {
        let result = reduce(previousResult, res);
        ++index === asyncFunctions.length ? resolve(result) : iterator(index, result);
      });
    };
    iterator(0, initialValue);
  });
}

promiseReduce([fn1, fn2, fn3, fn4], function (memo, value) {
  return memo + value;
}, 's').then(
  function fulfilled(res) {
    console.log('promise reduce result', res, 'result is valid', res === 'start');
  }
);
