const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    res.send('Images route');
});

module.exports = router;