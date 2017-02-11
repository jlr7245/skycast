var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.patch('/', (req,res) => {
  console.log(req.body.coords);
  res.status(200);
});

module.exports = router;
