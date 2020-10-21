// middleware/log.js

module.exports = config => async (ctx, next) => {
    console.log(config.format(ctx.url))
    console.log('nodify')
    await next()
}