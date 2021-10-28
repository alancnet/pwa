import app from './app.js'
import './websocket.js'
import rest from './rest.js'
import { sequelize } from './lib/sequelize.js'
import { User } from './lib/user-schema.js'
import './lib/key-value-schema.js'

async function main () {
  await sequelize.sync({
    alter: {
      drop: false
    }
  })

  // Initialize main user
  if (!(await User.findOne({ where: { username: 'wizulus' } }))) {
    await User.upsert({
      username: 'wizulus',
      role: 'wiz'
    })
  }

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

  if (process.env.TRACING) process.exit(0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
