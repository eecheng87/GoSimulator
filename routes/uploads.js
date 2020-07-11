let express = require('express');
let router = express.Router();
let util = require('util');
let fs = require('fs');
let multer = require('multer');

const upload = multer({
    dest: "uploads/"
});

router.get('/', function(req, res) {
    res.render('uploadPage', { title: "I love files!" });
});

router.post('/upload', upload.single('filename'), (req, res, next) => {
    if (req.files) {
        if (req.files.myFile.size === 0) {
            return next(new Error("Hey, first would you select a file?"));
        }
        fs.exists(req.files.myFile.path, (exists) => {
            if (exists) {
                res.end("Got your file!");
            } else {
                res.end("Well, there is no magic for those who don’t believe in it!");
            }
        })
    }
    res.redirect('/');
});
module.exports = router;