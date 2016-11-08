const denodeify = require('denodeify')

const glob = denodeify(require('glob'))

// provided glob patterns should be relative to the base path.
const prefixGlobPattern = (basePath, globPattern) => `${basePath}/${globPattern}`

module.exports = (config) => ({
  // array flattenig
  flatten: (list) => list.reduce((collection, entry) => list.concat(entry), []),

  // file list for the bundle glob pattern
  collect: (bundle) => glob(prefixGlobPattern(config.base, bundle))
})
