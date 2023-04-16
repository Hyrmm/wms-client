const express = require("express")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const { createProxyMiddleware } = require("http-proxy-middleware")
const config = require("./webpack.dev.js")


const app = express();
const compiler = webpack(config)






// dev-proxy中间件
// 具体配置文档:https://www.npmjs.com/package/http-proxy-middleware
switch (process.env.NODE_ENV) {
    case 'serve':
        var proxypath = 'http://hyrm.site:5000';
        break;
    case 'local':
        var proxypath = 'http://127.0.0.1:5000';
        break;
    default:
        var proxypath = "http://hyrm.site:5000";
}
app.use('/api', createProxyMiddleware({
    target: proxypath
}))

// dev-serve中间件
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));
// HRM热重载
app.use(webpackHotMiddleware(compiler))


app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
});