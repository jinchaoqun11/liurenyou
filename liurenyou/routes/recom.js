const express = require('express');
const conn = require('../dao/conn');

const router = express.Router();

// 每周推荐接口
router.route('/recommend')
  .get((req, res, next) => {
    const sql = `select recom from recommend`;
    conn.query(sql, (err, results) => {
      if (err) console.log(err);
      const result = JSON.parse(results[0].recom);
      res.json({
        status: 0,
        list: result[0].list
      });
    });
  });

module.exports = router;