import express from 'express'
import app from './app.js'
import './websocket.js'
import rest from './rest.js'

app.use(rest)

app.use((req, res, next) => {
  if (req.method === 'GET' && !req.url.split('/').pop().includes('.')) {
    console.log('Getting', req.method, req.url)
    res.sendFile(process.cwd() + '/pwa/index.html')
  } else {
    next()
  }
})

app.listen().catch((err) => {
  console.log(err.toString())
  process.exit(1)
})
