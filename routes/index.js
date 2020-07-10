const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, '../src/html') });
});

module.exports = router;