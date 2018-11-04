const fs = require('fs');

const path = process.argv[2];
console.log('path', path);

let descr = {
    files: [],
    dirs: []
};

const getDirectoryDescription = (path, separator, res) => Promise.all(res.map(item => readContent(path + separator + item)));

const readContent = (path) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.isFile()) {
        descr.files.push(path);
        resolve(descr);
      }
      //if (res.isDirectory()) {
        fs.readdir(path, (err, res) => {
          if (err) {
            reject(err);
            return;
          }
          descr.dirs.push(path);
          getDirectoryDescription(path, '/', res).then((res) => {
            resolve(descr);
          });
        });
    //  }
    });
  });
};

getDirectoryDescription('', '', [path])
.then(
  res => console.log(`directory desctiption for path "${path}": ${JSON.stringify(res)}`),
  err => console.log(err)
);
