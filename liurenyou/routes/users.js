var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/qwer', (req, res, next) => {
  res.json({
    msg: '成功'
  });
});

module.exports = router;
