import RestRouter from './lib/rest-router.js'

const rest = new RestRouter()
export default rest

rest.get('/rest/test', async (req) => {
  return {
    message: 'Hello World'
  }
})
