const { resolve, join, parse } = require('path')
const globby = require('globby')

module.exports = app => {
    const AppPath = resolve(__dirname, 'app')
    const context = app['context']

    // 方法一
    const fileAbsolutePath = ['config', 'middleware', 'service'].reduce(
        (folderMap, v) => {
            {folderMap[v] = join((AppPath, v), folderMap)}
        }, {}
    )
}