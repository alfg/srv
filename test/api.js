import test from 'ava';
import srv from '../build/lib/core.js';
import request from 'request-promise';

import config from '../default.json';


const listen = (fn) => {
  const server = srv(fn, config);
  const host = '127.0.0.1';

  return new Promise((resolve, reject) => {
    const listener = server.listen(err => {
      if (err) return reject(err);
      const port = listener.address().port;
      return resolve(`http://${host}:${port}`);
    });
  });
};


test('res.send(200 <String>)', async t => {
  const fn = async (app) => {
    app.get('/', (req, res) => {
      res.send('hello');
    });
  };

  const url = await listen(fn);
  const res = await request(url);

  t.deepEqual(res, 'hello');
});

test('res.json(200 <Object>)', async t => {
  const fn = async (app) => {
    app.get('/', (req, res) => {
      res.json({ hello: 'world' });
    });
  };

  const url = await listen(fn);
  const res = await request(url, { json: true });

  t.deepEqual(res, { hello: 'world' });
});

test('health-check OK', async t => {
  const fn = () => {};  // noop.

  const url = await listen(fn);
  const res = await request(url + '/health-check');

  t.deepEqual(res, 'HTTP OK');
});

test('test CORS', async t => {
  const fn = () => {};  // noop.

  const url = await listen(fn);

  const headers = { 'origin': 'testing.com' };
  const res = await request(url + '/health-check', { resolveWithFullResponse: true, headers: headers });

  t.deepEqual(res.headers['access-control-allow-origin'], 'testing.com');
});

test('null function', async t => {
  const fn = null;  // noop.

  const url = await listen(fn);
  const res = await request(url + '/health-check', { resolveWithFullResponse: true });

  t.deepEqual(res.statusCode, 200);
});
