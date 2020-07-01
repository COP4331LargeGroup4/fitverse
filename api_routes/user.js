const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../Models/User.model

// @route GET api_routes/user
// @description GET all items
// @access Public

router.get('/', (req, res) => {
  User.model.find()
    .then(users => res.json(users))
  });


module.exports = router;
