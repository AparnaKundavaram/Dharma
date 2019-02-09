const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'DharmaApu', message:'A Magnanimous!!'});
});

module.exports = router;
