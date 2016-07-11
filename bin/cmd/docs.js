import chalk from 'chalk';
import apidoc from 'apidoc';

export default function(src) {
  const opt = {
      dest: 'docs/',
      src: src || 'lib/',
      includeFilters: [ ".*\\.js$" ],
      silent: true
  };

  var created = apidoc.createDoc(opt);

  if (created) {
    return;
  }
  throw new Error(`Docs Error! ${opt.src} does not exist.`);
}
