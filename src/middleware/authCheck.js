/** Created By ChrisWen
 *  Middleware - authorizationCheck
 */

class AuthCheck {
  constructor(request, response, next) {
    this.request = request;
    this.response = response;
    this.next = next;
  }
  static checkLogin(request, response, next) {
    // if (!request.session.user) {
    //   return response.send('/signin');
    // }
    return next();
  }
  static checkLogOut(request, response, next) {
    if (!request.session.user) {
      return response.send('back');
    }
    return next();
  }
  static checkAdmin(request, response, next) {
    return next();
  }
}
module.exports = AuthCheck;
