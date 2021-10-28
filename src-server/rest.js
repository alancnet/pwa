import { get, set } from './lib/redis.js'
import RestRouter from './lib/rest-router.js'

const rest = new RestRouter()
export default rest

rest.get('/rest/test', async (req) => {
  const rec = await get('test') || { count: 0 }
  await set('test', { count: rec.count + 1 })
  return {
    message: 'Hello World'
  }
})
