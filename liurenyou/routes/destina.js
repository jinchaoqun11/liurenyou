const express = require('express');
const conn = require('../dao/conn');

const router = express.Router();

// 目的地页面

// 左侧列表接口
router.route('/side')
  .get((req, res, next) => {
    const sql = `select title from destina`;
    conn.query(sql, (err, results) => {
      if (err) console.log(err);
      const result = JSON.parse(results[0].title);
      res.json({
        status: 0,
        title: result[0].title
      });
    });
  });

// 右侧列表接口
router.route('/destinalist')
  .get((req, res, next) => {
    const sql = `select * from destinalist where id='${req.query.id}'`;
    conn.query(sql, (err, results) => {
      if (err) console.log(err);
      const result = JSON.parse(results[0].top);
      const result2 = JSON.parse(results[0].bottom);
      res.json({
        status: 0,
        listtop: result[0].top,
        listbottom: result2[0].bottom
      });
    });
  });

module.exports = router;