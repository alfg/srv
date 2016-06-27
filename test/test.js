/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
export default function test(app) {
    app.get('/test', (req, res) => {
        app.logger.info('log something else');
        res.send('test OK')
    })
}
