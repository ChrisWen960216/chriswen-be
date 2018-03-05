/** Created By ChrisWen
 *  signOut controller
 *  2018/03/05
 */
class SignController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  static signOut(request, response) {
    request.session.user = null;
    // response.redirect('/');
    response.send({ name: 'ChrisWen' });
  }
}

module.exports = SignController;
