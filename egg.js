const { resolve, join, parse } = require('path')
const globby = require('globby')

module.exports = app => {
    const AppPath = resolve(__dirname, 'app')
    const context = app['context']    
    // 获取所有目录的路径
    const fileAbsolutePath = {
        config: join(AppPath, 'config'),
        middleware: join(AppPath, 'middleware'),
        service: join(AppPath, 'service')
    }
    // 将路径绑定到 ctx 中
    Object.keys(fileAbsolutePath).forEach(v => {
        const path = fileAbsolutePath[v]
        const prop = v  // 挂载到 ctx 上面的key
        // globby 是搜索目录下所有文件的一个工具，主要用来搜索约定目录下的JS文件
        const files = globby.sync("**/*.js", {
            cwd: path
        })
        if (prop != "middleware") {
            context[prop] = {}  //初始化对象
        }

        files.forEach(file => {
            const filename = parse(file).name  // 文件的名字作为 key 挂载带子对象上面
            const content = require(join(path, file))  // 导入内容
            // middleware 处理逻辑
            if (prop === 'middleware') {
                if (filename in context['config']) {
                    // 先传递配置选项
                    const plugin = content(context['config'][filename])
                    app.use(plugin)  // 加载中间件
                }
                return
            }
            // 配置文件处理
            if (prop === 'config' && content) {
                context[prop] = Object.assign({}, context[prop], content)
                return
            }

            context[prop][filename] = content  // 挂载 service
        })
    })
}