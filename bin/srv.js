#!/usr/bin/env node

/* eslint no-console:0 */

import dotenv from 'dotenv';
import program from 'commander';
import chalk from 'chalk';
import pkg from '../package.json';
import config from '../default.json';
import { resolve } from 'path';

import * as cmd from './cmd/index';

// Banner.
const banner = `
▼ ${pkg.name} - v${pkg.version}
${pkg.homepage}
`;
console.log(chalk.cyan(banner));

// Load dotenv.
dotenv.config({ silent: true });

// Parse CLI args.
program
  .version(pkg.version)
  .usage('entrypoint.js [options]')
  .option('-p, --port [n]', 'Port to listen on', process.env.SRV_PORT || config.app.port)
  .option('-H, --host [value]', 'Host to listen on', process.env.SRV_HOST || config.app.host)
  .option('-D, --docs [value]', 'Generate Docs from folder', config.docs.folder)
  .option('-n, --no-babel', 'Skip Babel transformation')
  .option('-C, --config [value]', 'Configuration file')
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

if (program.config) {
  try {

    // Load and extend config.
    const customConfig = require(resolve(  // eslint-disable-line global-require
      process.cwd(), program.config));
    console.log(customConfig);
    console.log(chalk.blue('▼ Loading configuration: '), chalk.white(program.config));
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
}

// Start server.
cmd.server(file, port, host, config, (err) => {
  if (err) {
    console.error(chalk.red(err));
  }
  console.log(chalk.green('▼ Ready! Listening on:', chalk.white(`http://${host}:${port}`)));
});
