<script>
import { defineComponent } from 'vue'
import { client } from 'src/client.js'

export default defineComponent({
  name: 'PageIndex',
  async setup () {
    const onMessage = ({ message }) => {
      console.log('recv', message)
    }

    try {
      const res = await client.get('/rest/test')
      console.log('res', res)
    } catch (err) {
      console.error(err)
    }

    return {
      onMessage
    }
  },
  mounted () {
    client.connect()
    client.send({
      message: 'Hello World'
    })
    client.addEventListener('message', this.onMessage)
  },
  unmounted () {
    client.removeEventListener('message', this.onMessage)
  }
})
</script>

<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>
