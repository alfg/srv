import preset2015 from 'babel-preset-es2015';
import alias from 'babel-plugin-module-alias';
import transformRuntime from 'babel-plugin-transform-runtime';
import register from 'babel-register';

export default function transpile() {
  const path = require.resolve('babel-runtime/package')
  .replace(/[\\\/]package.json$/, '');

  try {
    register({
      presets: [preset2015],
      plugins: [
        transformRuntime,
        [alias, [
          { src: path, expose: 'babel-runtime' },
        ]],
      ],
    });
    return;
  } catch (e) {
    throw new Error(e);
  }
}
