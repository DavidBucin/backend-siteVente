const express = require('express')
const {
    createAdvert,
    getAdverts,
    getAdvert,
    deleteAdvert,
    updateAdvert
} = require('../controllers/advertController');

const router = express.Router()


router.get('/listAdvert', getAdverts)

router.get('/:id', getAdvert)

router.post('/:id', createAdvert);

router.delete('/:id', deleteAdvert);

router.patch("/:id", updateAdvert);


module.exports = router;


