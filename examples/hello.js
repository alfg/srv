/**
 * Sample apidoc hello.js application.
 * Run using: srv hello.js
 */


export default function hello(app) {

  /**
   * @api {get} /hello/:name Say "Hello" to user.
   * @apiName GetHello
   * @apiGroup Hello
   *
   * @apiParam {String} name Name of user.
   *
   * @apiSuccess {String} hello User.
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "hello": "Alf"
   *     }
   */
  app.get('/hello/:user', (req, res) => {
    const user = req.params.user;
    app.log.info(`Hello ${user}!`);
    res.json({ hello: user });
  });
}
