const express = require('express');
const router = express.Router();

/// basic search route

router.get('/', (req,res,next) => {
  res.render('search/index', {title: 'Search', currentRoute: 'search'});
});

module.exports = router;