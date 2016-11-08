const path = require('path')
const tap = require('tap')
const bundling = require(path.join(process.cwd(), 'lib/helper/bundling'))

tap.test('#jsBaseName describing the file name of a given lib root without js extension', t => {
  const b = bundling({})
  t.equal(b.jsBaseName('/some-path/lib.js'), 'lib', 'it should return the file name if it describes a module')

  t.end()
})

tap.test('#isIndexFile describes if a found bundle lib file is named "index"', t => {
  const b = bundling({})
  t.notOk(b.isIndexFile('/some-path/lib.js'), 'file names other than index should not be IndexFiles')
  t.ok(b.isIndexFile('/some-path/index.js'), 'files called index should be IndexFiles')

  t.end()
})

tap.test('the #folderName is just the folder that contains the given lib-file.', t => {
  const b = bundling({})
  t.equal(b.folderName('/some-path/some-folder/lib.js'), 'some-folder', 'should return the folder name only, without prefixing other path elements')

  t.end()
})

tap.test('#jsLibName describes the target library name for a given bundle', t => {
  const b = bundling({})
  t.equal(b.libName('/some-path/lib.js'), 'lib', 'it should return the file name if it describes a module')
  t.equal(b.libName('/some-path/lab/index.js'), 'lab', 'it should return the containing folder name if the file name is index')

  t.end()
})

tap.test('#moduleBasePath returns the target directory for the created bundle file', t => {
  const b = bundling({})
  t.equal(b.moduleBasePath('dist', 'dist/sample/index.js'), '', 'for index files without module path an empty string should be returned')
  t.equal(b.moduleBasePath('dist', 'dist/components/sample/index.js'), 'components', 'for index files inside a  module dir, the module dir should be returned')
  t.equal(b.moduleBasePath('dist', 'dist/components/grouped/sample/index.js'), 'components/grouped', 'sub groups should be resolved for index files')
  t.equal(b.moduleBasePath('dist', 'dist/components/sample.js'), 'components', 'module paths for libs should be returned')
  t.equal(b.moduleBasePath('dist', 'dist/utils/sample.js'), 'utils', 'module paths for libs should be returned')
  t.equal(b.moduleBasePath('dist', 'dist/components/grouped/sample.js'), 'components/grouped', 'sub module paths for libs should be returned')
  t.equal(b.moduleBasePath('dist', 'dist/sample.js'), '', 'libs withoud module path should return an empty string')

  t.end()
})
