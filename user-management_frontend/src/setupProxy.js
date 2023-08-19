const { createProxyMiddleware } = require('http-proxy-middleware');

const proxies = [
    {
        context: '/user',
        target: 'http://localhost:8084'
    },
];

module.exports = function (app) {
    proxies.forEach(proxy => {
        app.use(proxy.context, createProxyMiddleware(proxy));
    });
};
