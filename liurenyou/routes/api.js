const express = require('express');
const { sendMail } = require('../sendMail/sendMail');
const fs = require('fs');
const path = require('path');
const conn = require('../dao/conn');

const router = express.Router();

// 用户页面接口

// 发送邮件接口
router.route('/getcode')
  .post((req, res, next) => {
    fs.writeFile(path.join(__dirname, '..', 'temp', 'code.txt'), sendMail(req.body), 'utf8', (err) => {
      if (err) console.log(err);
    });
    fs.writeFile(path.join(__dirname, '..', 'temp', 'email.txt'), req.body.email, 'utf8', (err) => {
      if (err) console.log(err);
      res.json({
        status: 0,
        msg: '邮件已发送，请到邮箱查收'
      });
    });
  });

// 注册验证接口
router.route('/checkcode')
  .post((req, res, next) => {
    // 读取文件
    fs.readFile(path.join(__dirname, '..', 'temp', 'email.txt'), 'utf8', (err, data) => {
      if (err) console.log(err);
      fs.readFile(path.join(__dirname, '..', 'temp', 'code.txt'), 'utf8', (err, data2) => {
        if (err) console.log(err);
        if(data === req.body.email && data2 === req.body.code) {
          fs.writeFile(path.join(__dirname, '..', 'temp', 'email.txt'), '', (err) => {
            if (err) console.log(err);
          });
          fs.writeFile(path.join(__dirname, '..', 'temp', 'code.txt'), '', (err) => {
            if (err) console.log(err);
          });
          const sql = `INSERT INTO users (username, phone, email, address) VALUES ('${req.body.username}', '${req.body.phone}', '${req.body.email}', '${req.body.address}')`;
          conn.query(sql, (err) => {
            if (err) console.log(err);
          });
          res.json({
            status: 0,
            msg: '注册成功'
          })
        } else {
          res.json({
            status: 0,
            msg: '验证码或邮箱错误，请重新输入'
          })
        }
      });
    });
  });

// 登入接口
router.route('/login')
  .post((req, res, next) => {
    const sql = `select * from users where phone='${req.body.phone}' and username='${req.body.username}'`;
    conn.query(sql, (err, results) => {
      if (err) console.log(err);
      if(results.length) {
        res.json({
          status: 0,
          msg: '登入成功'
        });
      } else {
        res.json({
          status: 0,
          msg: '用户名或手机号码错误'
        });
      }
    });
  });

// 个人中心
router.route('/person')
  .post((req, res, next) => {
    const sql = `select * from users where phone='${req.body.phone}' and email='${req.body.email}'`;
    conn.query(sql, (err, results) => {
      if (err) console.log(err);
      res.json({
        status: 0,
        list: results[0]
      });
    });
  });

module.exports = router;