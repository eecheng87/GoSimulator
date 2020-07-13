let express = require('express');
let router = express.Router();
let util = require('util');
let fs = require('fs');
let multer = require('multer');
const { render } = require('../app');
let kifu_list_arr = [];

const upload = multer({
    dest: "uploads/",
    fileFilter: filter
});


function filter(req, file, cb) {
    if (!file.originalname.match(/\.(sgf)$/)) {
        req.fileValidationError = 'Only .sgf files are allowed!';
        //cb(null, false);
        return cb(null, false, new Error('goes wrong on the file type'));
    } else {
        cb(null, true);
    }
}

router.get('/', function(req, res) {
    res.render('uploadPage', { title: "I love files!" });
});

router.post('/upload', upload.single('filename'), (req, res, next) => {
    upload.single('filename')(req, res, (err) => {
        if (req.fileValidationError) {
            return res.end(req.fileValidationError);
        }
    });
    /*if (req.file) {
        if (req.file.myFile.size === 0) {
            return next(new Error("Hey, first would you select a file?"));
        }
        fs.exists(req.file.myFile.path, (exists) => {
            if (exists) {
                
            }
            else {
                            res.end("Well, there is no magic for those who don’t believe in it!");
                        }
        })
    }*/

    kifu_list_arr.push(req.file.originalname);
    /* redirect to HOME and get new front-end view rendered by new list */
    res.redirect('/');
});

module.exports.kifu_list_arr = kifu_list_arr;
module.exports.router = router;