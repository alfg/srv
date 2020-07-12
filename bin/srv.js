#!/usr/bin/env node

import dotenv from 'dotenv';
import program from 'commander';
import chalk from 'chalk';
import updateNotifier from 'update-notifier';
import pkg from '../package.json';
import config from './default.json';
import { resolve } from 'path';

import * as cmd from './cmd/index';

updateNotifier({ pkg }).notify();

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
  .option('-p, --port [n]', 'Port to listen on', process.env.PORT)
  .option('-H, --host [value]', 'Host to listen on', process.env.HOST)
  .option('-D, --docs [value]', 'Generate Docs from folder', config.docs.folder)
  .option('-L, --lint', 'Lint code with ESLint')
  .option('-n, --no-babel', 'Skip Babel transformation')
  .option('-C, --config [value]', 'Configuration file')
  .parse(process.argv);


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

// Update config object if custom config file is provided.
if (program.config) {
  try {
    // Load external config file.
    const customConfig = require(resolve(  // eslint-disable-line global-require
      process.cwd(), program.config));

    // Extend config object.
    Object.assign(config, customConfig);

    console.log(chalk.blue('▼ Loading configuration: '), chalk.white(program.config));
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
}

// Skip babel transpilation if flag set.
if (!program.noBabel) {
  try {
    cmd.transpile();
    console.log(chalk.blue('▼ Babel transpiled. Preset: @babel/preset-env'));
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
}

// Generate docs flag.
if (program.docs) {
  try {
    cmd.docs(program.docs, config.docs);
    console.log(chalk.blue('▼ Docs generated.'), chalk.white(`http://${config.app.host}:${config.app.port}/docs`));
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
}

if (program.lint) {
  try {
    console.log(chalk.blue('▼ Linting code.'));
    cmd.lint(config.lint);
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
}

// Host and port flags take precedence.
config.app.host = program.host || config.app.host;
config.app.port = program.port || config.app.port;

// Start server.
cmd.server(file, config, (err) => {
  if (err) {
    console.error(chalk.red(err));
  }
  const { host, port } = config.app;
  console.log(chalk.green('▼ Ready! Listening on:', chalk.white(`http://${host}:${port}`)));
});
