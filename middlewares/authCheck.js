/** Created by ChrisWen
 *  Authorization Checked
 *  18/03/12
 */

// class AuthCheck {
//   constructor(request, response, next) {
//     this.request = request;
//     this.response = response;
//     this.next = next;
//   }

//   logIn() {
//     const { request, response, next } = this;
//     if (!request.session.user) {
//       // request.flash('error', '未登录');
//       return response.redirect('/signin');
//     }
//     return next();
//   }

//   logOut() {
//     const { request, response, next } = this;
//     if (request.session.user) {
//       // request.flash('error', '已登录');
//       return response.redirect('back');
//     }
//     return next();
//   }
// }

// module.exports = AuthCheck;

module.exports = {
  checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录');
      return res.redirect('/signin');
    }
    return next();
  },

  checkLogOut(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录');
      return res.redirect('back');// 返回之前的页面
    }
    return next();
  },
};
