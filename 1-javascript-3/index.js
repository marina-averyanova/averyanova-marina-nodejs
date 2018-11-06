const tree = require('./tree');

const path = process.argv[2];
console.log('path', path);

tree(path)
.then(
  res => console.log(`directory desctiption for path "${path}": ${JSON.stringify(res)}`),
  err => console.log(err)
);
