# egg_practise

# Conventions and the application directory structure.

- ***app/router.js*** 用于配置 URL 路由规则
- ***app/controller/*** 用于解析用户的输入，处理后返回相应的结果
- ***app/service/*** 用于编写业务逻辑层，可选，建议使用
- ***app/middleware/*** 用于编写中间件，可选
- ***app/public/*** 用于放置静态资源
- ***app/extend*** 用于框架的扩展
- ***config/config.{env}.js*** 用于编写配置文件
- ***config/plugin.js*** 用于配置需要加载的插件
- ***text/*** 用于单元测试
- ***app.js*** 用于自定义启动时的初始化工作
- ***app/schedule*** 用于定时任务