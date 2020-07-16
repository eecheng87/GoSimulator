let fs = require('fs');


function async_read(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(`./uploads/${file}`, function(err, data) {
            if (err)
                reject(err);
            else
                resolve(data.toString());
        });
    });
}


module.exports.async_read = async_read;