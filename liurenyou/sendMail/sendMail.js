const nodemailer = require('nodemailer');

const user = {
  name : '1551330042@qq.com', // 邮箱账户
  pass : 'smjlyswwgvrtifhc'  // 邮箱客户端密码
};

// 创建传输对象
let transporter = nodemailer.createTransport({
  host: "smtp.qq.com", // 邮箱服务的主机名
  port: 465, // 邮箱服务端口号
  secure: true, // true for 465, false for other ports
  auth: {
    user: user.name, 
    pass: user.pass, 
  },
});

function sendMail(opt) {
  let code = getCode();
  let mailObj = {
    from: '"六人游" <1551330042@qq.com>', // 发送者
    to: opt.email, // 接收者的邮箱
    subject: "liurenyou - 验证码", // 主题
    // text: "Hello world?", // plain text body
    html: `<h1>您的验证码是${code}</h1>`, // html body
  };

  transporter.sendMail(mailObj,(err,infor) => {
    if (err) console.log(err);
    console.log(infor);
  });

  return code;
}

function random (min,max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getCode () {
  let code = '';

  for (let i = 0; i < 6; i++) {
    let type = random(1,3);

    switch (type) {
      case 1 :
        code += String.fromCharCode(random(48,57));
        break;
      case 2 :
        code += String.fromCharCode(random(65,90));
        break;
      case 3 :
        code += String.fromCharCode(random(97,122));
        break;  
    }
  }
  
  return code;
}

module.exports = {
  sendMail
}