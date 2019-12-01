const proxy = require("http-proxy-middleware")

module.exports = function(app) {
  app.use(
    "/p24api",
    proxy({
      target: "https://api.privatbank.ua",
      changeOrigin: true
    })
  )
}
