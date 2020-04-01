// server.js
const Express = require('express')
const server = new Express()
const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')

const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8')
const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'))

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest // （可选）客户端构建 manifest
})

// 在服务器处理函数中……
server.get('*', (req, res) => {
  const context = { url: req.url }
  console.log(context)
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    // 处理异常……
    if (err) {
      console.log(err)
    }
    res.end(html)
  })
})

server.listen(9093, () => {
  console.log('server on 9093')
})
