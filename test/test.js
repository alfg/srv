export default function test(app) {
    app.get('/test', (req, res) => {
        app.logger.info('log something else');
        res.send('test OK')
    })
}
