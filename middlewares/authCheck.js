/** Created by ChrisWen
 *  Authorization Checked
 *  18/03/12
 */

const ResponseExtend = require('../extends/response');
const status = require('../common/status');

module.exports = {
  checkLogin(request, response, next) {
    if (!request.session || !request.session.user) {
      const resStatus = status.PERMISSION_DENIED;
      const resData = ResponseExtend.createResMsg(resStatus, '还没有登录');
      return response.json(resData);
    }
    return next();
  },
  checkAdmin(request, response, next) {
    if (request.session.user === 'ChrisWen' && request.session.authCode === 0) {
      return next();
    }
    const resStatus = status.PERMISSION_DENIED;
    const resData = ResponseExtend.createResMsg(resStatus, '权限验证失败');
    return response.json(resData);
  },

  // checkLogOut(request, response, next) {
  //   if (request.session.user) {
  //     const resStatus = status.PERMISSION_DENIED;
  //     const resData = ResponseExtend.createResMsg(resStatus, '已经登出');
  //     return response.send(resData);
  //   }
  //   return next();
  // },
};
