const express = require('express');
const conn = require('../dao/conn');

const router = express.Router();

// 首页接口

// 轮播图接口
router.route('/swiper')
  .get((req, res, next) => {
    const sql = `select url from home`;
    conn.query(sql, (err, result) => {
      if (err) console.log(err);
      const results = JSON.parse(result[0].url);
      res.json({
        status: 0,
        list: results[0].list
      });
    });
  });

// 目的地图片文字接口
router.route('/area')
  .get((req, res, next) => {
    const sql = `select destina from home`;
    conn.query(sql, (err, results) => {
      if (err) console.log(err);
      const result = JSON.parse(results[0].destina);
      res.json({
        status: 0,
        list: result[0].list
      });
    });
  });

// 深度策划
router.route('/plan')
  .get((req, res, next) => {
    const sql = `select plan from home`;
    conn.query(sql, (err, results) => {
      if (err) console.log(err);
      const result = JSON.parse(results[0].plan);
      res.json({
        status: 0,
        list: result[0].list
      })
    });
  });

// 旅行灵感
router.route('/travel')
  .get((req, res, next) => {
    const sql = `select travel from home`;
    conn.query(sql, (err, results) => {
      if (err) console.log(err);
      const result = JSON.parse(results[0].travel);
      res.json({
        status: 0,
        list: result[0].list
      });
    });
  });

// 更多 深度策划
router.route('/planmore')
  .get((req, res, next) => {
    const sql = `select planmore from home`;
    conn.query(sql, (err, results) => {
      if (err) console.log(err);
      const result = JSON.parse(results[0].planmore);
      res.json({
        status: 0,
        list: result[0].list
      })
    });
  });

// 旅行灵感详情
router.route('/traveldetail')
  .get((req, res, next) => {
    const sql = `select * from traveldetail where id='${req.query.id}'`;
    conn.query(sql, (err, results) => {
      if (err) console.log(err);
      const result = JSON.parse(results[0].title)
      res.json({
        status: 0,
        list: result[0].list
      });
    });
  });

module.exports = router;