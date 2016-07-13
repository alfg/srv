import test from 'ava';
import srv from '../build/lib/core.js';
import request from 'request-promise';


const listen = (fn) => {
  const server = srv(fn);
  const port = 0;
  const host = '127.0.0.1';

  return new Promise((resolve, reject) => {
    const listener = server.listen(port, host, err => {
      if (err) return reject(err);
      const port = listener.address().port;
      resolve(`http://${host}:${port}`);
    });
  });
}


test('res.send(200 <String>)', async t => {
  const fn = async (app) => {
    app.get('/', (req, res) => {
      res.send('hello');
    });
  }

  const url = await listen(fn);
  const res = await request(url);

  t.deepEqual(res, 'hello');
});

test('res.json(200 <Object>)', async t => {
  const fn = async (app) => {
    app.get('/', (req, res) => {
      res.json({ hello: 'world' });
    });
  }

  const url = await listen(fn);
  const res = await request(url, { json: true});

  t.deepEqual(res, { hello: 'world' });
});
