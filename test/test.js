export default function test(app) {
    console.log('test');
    app.get('/test', (req, res) => {
        res.send('test OK')
    })
}
