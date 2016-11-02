const path = require('path')
const rollup = require('rollup').rollup
const buble = require('rollup-plugin-buble')

const pckg = require(path.resolve(process.cwd(), 'package.json'))
const helper = require('./lib/helper')(pckg.config)

const config = {
  bundles: pckg.config.bundles,
  paths: {
    dist: 'dist'
  }
}

const build = (lib, external) => rollup(Object.assign({}, { external }, {
  entry: lib,
  plugins: [buble()]
}))
.then((bundle) => bundle.write({
  format: pckg.config.bundle.format,
  dest: helper.modulePath(lib)
}))
.catch(e => console.log(e))

Promise.all(config.bundles.map(bundle => helper.collectLibs(bundle)))
.then(bundleGlobs => helper.flattenBundles(bundleGlobs))
.then(bundles => {
  const externalBundles = helper.externals(bundles)

  return bundles.map(lib => build(lib, externalBundles))
})
.then(bundles => Promise.all(bundles))
.then(() => console.log('finished'))
