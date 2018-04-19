const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, './img/'), (error, file) => {
  if (!error) {
    console.log(file);
  }
  console.log(error);
});

