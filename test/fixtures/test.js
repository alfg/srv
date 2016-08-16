export default function (app) {
  app.get('/hello/:user', (req, res) => {
    const user = req.params.user;
    res.json({ hello: user });
  });
}
