require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

// API Proxy
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer()

const port = process.env.PORT || 3001

app.use(cookieParser())

// Static Assets
app.use(express.static('dist'))

app.all('/api/*', (req, res) => {
  proxy.web(req, res, {
    target: process.env.API_HOST
  })
})

// Catch All
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.listen(port, () => (
  console.info(`==> Express listening on port ${port}.`)
));
