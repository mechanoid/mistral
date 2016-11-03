const path = require('path')
const denodeify = require('denodeify')
const glob = denodeify(require('glob'))

const prefixGlobPattern = (prefix, globPattern) => `${prefix}/${globPattern}`

const jsBaseName = (jsFilePath) => path.basename(jsFilePath, '.js')

const folderName = (filePath) => path.basename(path.dirname(filePath))

const isIndexFile = (libPath) => jsBaseName(libPath) === 'index'

const libName = (libPath) =>
  isIndexFile(libPath) ? folderName(libPath) : jsBaseName(libPath)

const oneFolderUp = (filePath) => {
  const dirName = path.dirname(filePath)
  return dirName === '.' ? '' : dirName
}

const moduleBasePath = (basePath, libPath) => {
  const libFolder = path.dirname(libPath)
  const pathDifference = path.relative(basePath, libFolder)

  return (isIndexFile(libPath)) ? oneFolderUp(pathDifference) : pathDifference
}

module.exports = (config) => ({
  libName,
  jsBaseName,
  isIndexFile,
  folderName,
  moduleBasePath,

  collectLibs: (bundle) => glob(prefixGlobPattern(config.base, bundle)),

  modulePath: (libPath) => path.resolve(config.paths.dist, moduleBasePath(config.base, libPath), `${libName(libPath)}.js`),

  flattenBundles: (globs) => globs.reduce((bundles, bundle) => bundles.concat(bundle), []),

  externals: (bundles) => bundles.map((libPath) => {
    const moduleBase = moduleBasePath(config.base, libPath)

    return moduleBase !== '.' ? `${moduleBase}/${libName(libPath)}` : libName(libPath)
  })
})
