import { resolve } from 'path';

export default function (fn, app, opt) {
  try {
    fn(app);
  } catch (e) {
    console.log('Error: Unable to load middleware', e);
  }
}
