let express = require('express');
let router = express.Router();
let util = require('util');
let fs = require('fs');
let multer = require('multer');
const { render } = require('../app');

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
    //kifu_list.append_item(req.file.originalname);


    console.log(req.file.originalname);
    //res.send(req.file);
    res.render('index', { kifu_text: req.file.originalname }, (err, html) => {
        res.send(html);
    });
    //res.redirect('/');
});

module.exports = router;