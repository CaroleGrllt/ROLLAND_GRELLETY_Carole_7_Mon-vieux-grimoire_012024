const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book')
const imgResize = require('../middleware/img-resizing')

router.post('/', auth, multer, imgResize, bookCtrl.createBook);
router.post('/:id/rating', auth, bookCtrl.createRating);
router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getTopBooks);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multer, imgResize, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

module.exports = router;