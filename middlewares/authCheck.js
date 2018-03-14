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
      const resData = ResponseExtend.createResMsg(resStatus, '无权限操作');
      request.session.user = 'ChrisWen';
      return response.send(resData);
    }
    return next();
  },

  // checkLogOut(request, response, next) {
  //   if (request.session.user) {
  //     // const resStatus = status.PERMISSION_DENIED;
  //     // return ResponseExtend.createResMsg(resStatus, '已经被登出');
  //   }
  //   return next();
  // },
};
