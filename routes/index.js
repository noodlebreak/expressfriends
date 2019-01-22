var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

sequelize = require('../models/index').sequelize;
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  res.render('index', { title: 'Friends!'});
});

module.exports = router;
