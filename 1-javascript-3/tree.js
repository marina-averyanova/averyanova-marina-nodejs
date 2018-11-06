const fs = require('fs');
const pathModule = require('path');

let descr = {
    files: [],
    dirs: []
};

const getDirectoryDescription = (data, pathHead = '') => {
  return Promise.all([].concat(data).map(item => readContent(pathModule.join(pathHead, item))));
}

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
        return;
      }
      fs.readdir(path, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        descr.dirs.push(path);
        getDirectoryDescription(res, path).then((res) => {
          resolve(descr);
        });
      });
    });
  });
};

module.exports = getDirectoryDescription;
