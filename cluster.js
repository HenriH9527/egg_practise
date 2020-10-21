// cluster.js 多进程 HTTP 服务

const cfork = require('cfork')
const chokidar = require('chokidar')
const { resolve } = require('path')
const reload = require('cluster-reload')

// 通过 cfork 多进程运行 index.js 然后利用 chokidar 监听代码文件，当发生修改时， 通过 cluster-reload 重启进程
const master = cfork({
    exec: resolve(__dirname, 'index.js'),
    count: 2
})

chokidar.watch('./app').on('change', (event, path) => {
    console.log(event, path)
    reload(2)
})