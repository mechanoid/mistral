const path = require('path')
const rollup = require('rollup').rollup
const buble = require('rollup-plugin-buble')

const pckg = require(path.resolve(process.cwd(), 'package.json'))
const globbing = require('./lib/helper/globbing')(pckg.config.mistral)
const helper = require('./lib/bundle-helper')(pckg.config.mistral)

const config = {
  bundles: pckg.config.mistral.bundles,
  paths: {
    dist: pckg.config.mistral.paths.dist
  }
}

// In this build tool wrapper we decide for rollup (because of its tree-shaking functionality)
// and buble as es6 transpiler.
const build = (lib, external) => rollup(Object.assign({}, { external }, {
  entry: lib,
  plugins: [buble()]
}))
.then((bundle) => bundle.write({
  format: pckg.config.mistral.format,
  dest: helper.modulePath(lib)
}))
.catch(e => console.log(e))

// Collect all files found by the given glob-patterns and build each file
// as own bundle. To the build process all collected libraries will be configured
// as externals to each other.
Promise.all(config.bundles.map(bundle => globbing.collect(bundle)))
.then(bundleGlobs => globbing.flatten(bundleGlobs))
.then(bundles => {
  const externalBundles = helper.externals(bundles)

  return bundles.map(lib => build(lib, externalBundles))
})
.then(bundles => Promise.all(bundles))
.then(() => console.log('finished'))
