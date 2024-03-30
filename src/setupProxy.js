import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/apis', {
      target: 'https://openapi.koreainvestment.com:9443',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};
