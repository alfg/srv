import presetEnv from '@babel/preset-env';
import alias from 'babel-plugin-module-resolver';
import transformRuntime from '@babel/plugin-transform-runtime';
import register from '@babel/register';

export default function transpile() {
  const path = require.resolve('@babel/runtime/package')
  .replace(/[\\/]package.json$/, '');

  try {
    register({
      presets: [presetEnv],
      plugins: [
        transformRuntime,
        [alias,
          { src: path, expose: 'babel-runtime' },
        ],
      ],
    });
    return;
  } catch (e) {
    throw new Error(e);
  }
}
