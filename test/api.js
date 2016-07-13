import test from 'ava';
import srv from '../build/lib/core.js';
import request from 'supertest-as-promised';
import express from 'express';

test('res.send(200 <String>)', async t => {
  function fn(app) {
    app.get('/', (req, res) => {
      res.send('hello');
    });
    return app;
  }

  const test = srv(fn);
  const res = await request(test)
    .get('/').send();

  t.deepEqual(res.text, 'hello');
});

test('res.json(200 <Object>)', async t => {
  function fn(app) {
    app.get('/', (req, res) => {
      res.json({ hello: 'world' });
    });
    return app;
  }

  const test = srv(fn);
  const res = await request(test)
    .get('/').send();
  t.deepEqual(res.body, { hello: 'world' });
});
