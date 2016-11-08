const path = require('path')
const tap = require('tap')
const globbing = require(path.join(process.cwd(), 'lib/helper/globbing'))

tap.test('#flatten', t => {
  const g = globbing({})
  t.deepEqual(g.flatten(['a']), ['a'], 'should keep flattened arrays untouched')
  t.deepEqual(g.flatten([['a']]), ['a'], 'should reduce the array depth by one for a nested array')
  t.deepEqual(g.flatten([[['a']]]), [['a']], 'should reduce the array depth by one for a nested array')
  t.deepEqual(g.flatten([['a'], ['b']]), ['a', 'b'], 'should flatten a list of given arrays')

  t.end()
})

tap.test('#prefixGlobPattern', t => {
  const g = globbing({})
  t.equal(g.prefixGlobPattern('base', 'path/path/path.*.js'), 'base/path/path/path.*.js')
  t.equal(g.prefixGlobPattern('base', '/path/path/path.*.js'), 'base/path/path/path.*.js')

  t.end()
})
