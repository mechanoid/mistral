const path = require('path')
const rollup = require('rollup').rollup
const buble = require('rollup-plugin-buble')

const pckg = require(path.resolve(process.cwd(), 'package.json'))
const bundleHelper = require('./lib/bundle-helper')(pckg.mistral)

const config = {
  bundles: pckg.mistral.bundles,
  paths: {
    dist: pckg.mistral.paths.dist
  }
}

const build = (lib, external) => rollup(Object.assign({}, { external }, {
  entry: lib,
  plugins: [buble()]
}))
.then((bundle) => bundle.write({
  format: pckg.mistral.bundle.format,
  dest: bundleHelper.modulePath(lib)
}))
.catch(e => console.log(e))

Promise.all(config.bundles.map(bundle => bundleHelper.collectLibs(bundle)))
.then(bundleGlobs => bundleHelper.flattenBundles(bundleGlobs))
.then(bundles => {
  const externalBundles = bundleHelper.externals(bundles)

  return bundles.map(lib => build(lib, externalBundles))
})
.then(bundles => Promise.all(bundles))
.then(() => console.log('finished'))
