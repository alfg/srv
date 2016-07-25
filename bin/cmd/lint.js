import { resolve } from 'path';
import eslint from 'eslint';

const cwd = resolve(process.cwd());
const rc = resolve(process.cwd(), '.eslintrc');

export default function (opt) {
  const options = {
    ignorePattern: opt.ignorePattern || ['node_modules', 'build', 'docs'],
    cwd,
    configFile: rc || null,
    baseConfig: rc ? false : opt.rules,
  };

  const cli = new eslint.CLIEngine(options);
  const report = cli.executeOnFiles(['.']);
  const formatter = cli.getFormatter();
  console.log(formatter(report.results));  // eslint-disable-line no-console
}
