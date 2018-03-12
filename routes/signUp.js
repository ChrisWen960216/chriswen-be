const express = require('express');

const router = express.Router();

const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');

const UserModel = require('../models/users');
const { checkLogOut } = require('../middlewares/authCheck');

// GET /signin 登录页
router.get('/', checkLogOut, (req, res) => {
  res.render('signup');
});

// POST /signin 用户登录
router.post('/', checkLogOut, (request, response, next) => {
  const {
    name, gender, bio, repassword,
  } = request.fields;
  let { password } = request.fields;
  const avatar = request.files.avatar.path.split(path.sep).pop();


  // 校验参数
  try {
    if (!(name.length >= 1 && name.length <= 10)) {
      throw new Error('名字请限制在 1-10 个字符');
    }
    if (['m', 'f', 'x'].indexOf(gender) === -1) {
      throw new Error('性别只能是 m、f 或 x');
    }
    if (!(bio.length >= 1 && bio.length <= 30)) {
      throw new Error('个人简介请限制在 1-30 个字符');
    }
    if (!request.files.avatar.name) {
      throw new Error('缺少头像');
    }
    if (password.length < 6) {
      throw new Error('密码至少 6 个字符');
    }
    if (password !== repassword) {
      throw new Error('两次输入密码不一致');
    }
  } catch (e) {
    // 注册失败，异步删除上传的头像
    fs.unlink(request.files.avatar.path);
    request.flash('error', e.message);
    return response.redirect('/signup');
  }

  // 明文密码加密
  password = sha1(password);

  // 待写入数据库的用户信息
  let user = {
    name,
    password,
    gender,
    bio,
    avatar,
  };
  // 用户信息写入数据库
  UserModel.create(user)
    .then((result) => {
      // 此 user 是插入 mongodb 后的值，包含 _id
      [user] = result.ops;
      // 删除密码这种敏感信息，将用户信息存入 session
      delete user.password;
      request.session.user = user;
      // 写入 flash
      request.flash('success', '注册成功');
      // 跳转到首页
      request.redirect('/posts');
    })
    .catch((e) => {
      // 注册失败，异步删除上传的头像
      fs.unlink(request.files.avatar.path);
      // 用户名被占用则跳回注册页，而不是错误页
      if (e.message.match('duplicate key')) {
        request.flash('error', '用户名已被占用');
        return response.redirect('/signup');
      }
      return next(e);
    });
  return true;
});

module.exports = router;
