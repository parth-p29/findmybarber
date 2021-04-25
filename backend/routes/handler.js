const express = require('express');
const router = express.Router();

router.get('/main', (req, res) => {

    const returndata = [
        {
            'test': 'hello'
        }
    ]

    res.end(JSON.stringify(returndata));
});


module.exports = router;

