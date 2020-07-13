const express = require('express');
const router = express.Router();
const path = require('path');
const uploads = require('./uploads');

/* GET home page. */
router.get('/', (req, res) => {
    /* should follow JSON format, double quote for key is important */
    res.render('index', {
        "kifu_macro": uploads.kifu_list_arr
    }, (err, html) => {
        res.send(html);
    });
});

module.exports.router = router;