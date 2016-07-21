import apidoc from 'apidoc';

export default function (src, opt) {
  const options = {
    src: src || 'lib/',
    dest: opt.dest || 'docs/',
    includeFilters: opt.includeFilters || ['.*\\.js$'],
    silent: opt.silent || true,
  };

  const created = apidoc.createDoc(options);

  if (created) {
    return;
  }
  throw new Error(`Docs Error! ${opt.src} does not exist.`);
}
