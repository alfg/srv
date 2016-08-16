import path from 'path';
import test from 'ava';
import srv from '../build/lib/core.js';
import request from 'request-promise';
import { spawn } from 'superspawn';

import config from '../default.json';

// function execCli(args, cb) {

// 	var processPromise = new Promise((resolve, reject) => {
//     console.log(cliPath);
// 		child = childProcess.spawn(process.execPath, ['--version'], {
// 			cwd: dirname,
// 			env: env,
// 			stdio: [null, 'pipe', 'pipe']
// 		});
//
//     console.log('close start');
//
// 		child.on('close', function (code, signal) {
// 			if (code) {
//         console.log('code error');
// 				var err = new Error('test-worker exited with a non-zero exit code: ' + code);
// 				err.code = code;
// 				err.signal = signal;
// 				return reject(err);
// 			}
//       console.log('code');
// 			return resolve(code);
// 		});
//
// 		stdout = getStream(child.stdout);
// 		stderr = getStream(child.stderr);
// 	});
//
// 	Promise.all([processPromise, stdout, stderr]).then(function (args) {
//     console.log('promise all done');
// 		cb.apply(null, args);
// 	}).catch(function(err) {
//     console.log(err);
//   });
//
// 	return child;
// }

const cliPath = path.join(__dirname, '../build/srv');

function execCli() {
  var dirname = path.join(__dirname);
  console.log(process.execPath,);
  console.log(cliPath);
  console.log(path.relative(dirname, cliPath));
  spawn(process.execPath, [cliPath, '--help'], {
    cwd: dirname,
		env: {},
		stdio: [null, 'pipe', 'pipe']
  }, function (err, output) {
    console.log('done');
    if (err) {
      console.log(err);
    }
    console.log(output);
  });

}

test('cli', async t => {
  // execCli('--help', function (err, stdout) {
  //   console.log(err, stdout);
  //   console.log('waaaat');
  //   if (err) {
  //     t.fail();
  //   }
  //   t.pass();
  // })
  execCli();
});
