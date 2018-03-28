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

  // checkLogOut(request, response, next) {
  //   if (request.session.user) {
  //     const resStatus = status.PERMISSION_DENIED;
  //     const resData = ResponseExtend.createResMsg(resStatus, '已经登出');
  //     return response.send(resData);
  //   }
  //   return next();
  // },
};
