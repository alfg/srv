#!/usr/bin/env node

/* eslint no-console:0 */

import program from 'commander';
import chalk from 'chalk';
import pkg from '../package.json';
import { resolve } from 'path';

import * as cmd from './cmd/index';

// Banner.
const banner = `
▼ ${pkg.name} - v${pkg.version}
${pkg.homepage}
`;
console.log(chalk.cyan(banner));

// Parse CLI args.
program
  .version(pkg.version)
  .usage('entrypoint.js [options]')
  .option('-p, --port [n]', 'Port to listen on', 3000)
  .option('-H, --host [value]', 'Host to listen on', '0.0.0.0')
  .option('-D, --docs [value]', 'Generate Docs from folder', 'lib')
  .option('-n, --no-babel', 'Skip Babel transformation')
  .parse(process.argv);

const port = program.port || 3000;
const host = program.host || '0.0.0.0';


// Parse entrypoint file.
let file = program.args.pop();
if (!file) {
  try {
    const packageJson = require(resolve(  // eslint-disable-line global-require
      process.cwd(), 'package.json'));
    file = packageJson.main;
  } catch (e) {
    console.error(chalk.red(e));
    process.exit(1);
  }
}

if (!file) {
  console.error(chalk.red('Error! Please supply a file.'));
  process.exit(1);
}

if (file[0] !== '/') {
  file = resolve(process.cwd(), file);
}

// Skip babel transpilation if flag set.
if (!program.noBabel) {
  try {
    cmd.transpile();
    console.log(chalk.blue('▼ Babel transpiled. Preset: ES2015'));
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
}

// Generate docs flag.
if (program.docs) {
  try {
    cmd.docs(program.docs);
    console.log(chalk.blue('▼ Docs generated.'), chalk.white(`http://${host}:${port}/docs`));
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
}

// Start server.
cmd.server(file, port, host, (err) => {
  if (err) {
    console.error(chalk.red(err));
  }
  console.log(chalk.green('▼ Ready! Listening on:', chalk.white(`http://${host}:${port}`)));
});