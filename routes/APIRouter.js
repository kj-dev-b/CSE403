const express = require('express');
const router = express.Router();
const qrController = require('../controllers/QreviewController');

// get all pull requests
router.get('/pr/:owner/:repo', qrController.getAll);

// get one singel pull request
router.get('/pr/:owner/:repo/:number', qrController.getSingle);

// create a pull request
router.post('/pr/:owner/:repo/create', qrController.create);

// update a pull request
router.patch('pr/:owner/:repo/:number/update', qrController.update);

// merge a pull request
router.put('pr/:owner/:repo/:number/merge', qrController.merge);

module.exports = router;