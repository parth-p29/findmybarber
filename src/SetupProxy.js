const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

module.exports = function(app) {
  app.use(
    '/maps/api/place/nearbysearch/json',
    createProxyMiddleware({
      target: 'https://maps.googleapis.com',
      changeOrigin: true,
    })
  );
};