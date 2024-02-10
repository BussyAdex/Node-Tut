const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) =>{
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, '..','views', 'index.html'));
});

router.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..','views', '404.html'));
});

module.exports = router;