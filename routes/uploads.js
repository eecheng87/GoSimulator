let express = require('express');
let router = express.Router();
let util = require('util');
let fs = require('fs');
let multer = require('multer');
const { render } = require('../app');
let kifu_list_arr = [];
let kifu_dict = {}; // record relation hash name and alias name

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
    /* Example of file object:
        { fieldname: 'filename',
        originalname: 'AlphaGo_AlphaGo_第三局_繁體.sgf',
        encoding: '7bit',
        mimetype: 'application/octet-stream',
        destination: 'uploads/',
        filename: 'b65e0ebb460d4c32725bf1c47f870a6f',
        path: 'uploads\\b65e0ebb460d4c32725bf1c47f870a6f',
        size: 23035 }
    */
    kifu_dict[`${req.file.originalname}`] = req.file.filename;

    kifu_list_arr.push(req.file.originalname);
    /* redirect to HOME and get new front-end view rendered by new list */
    res.redirect('/');
});

module.exports.kifu_dict = kifu_dict;
module.exports.kifu_list_arr = kifu_list_arr;
module.exports.router = router;