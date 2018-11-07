const fs = require('fs');
const pathModule = require('path');

const getDirectoryDescription = (data, pathHead = '', memo = {files: [], dirs: []}) => {
  return Promise.all([].concat(data).map(item => readContent(pathModule.join(pathHead, item), memo)));
}

const readContent = (path, memo) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.isFile()) {
        memo.files.push(path);
        resolve(memo);
        return;
      }
      fs.readdir(path, (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        memo.dirs.push(path);
        getDirectoryDescription(res, path, memo).then((res) => {
          resolve(memo);
        });
      });
    });
  });
};

module.exports = getDirectoryDescription;
