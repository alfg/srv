import express from 'express';

const app = express();

export default function srv(fn) {
    // Hook in middleware here.
    fn(app);
    app.get('/health-check', (req, res) => {
        res.send('OK')
    })

    return app;
}
