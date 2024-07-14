<template>
  <div>{{ receivedMessages }}</div>
</template>

<script setup lang="ts">
import { reactive, ref, onUnmounted, unref } from 'vue'
import * as mqtt from 'mqtt/dist/mqtt.min'

const protocol = location.protocol === 'https:' ? 'wss' : 'ws'
const port = protocol === 'wss' ? 8084 : 8083

const connection = reactive({
  protocol,
  host: 'broker.emqx.io',
  port,
  clientId: 'emqx_vue3_' + Math.random().toString(16).substring(2, 8),
  username: 'emqx_test',
  password: 'emqx_test',
  clean: true,
  connectTimeout: 30 * 1000,
  reconnectPeriod: 4000 // 两次重新连接之间的间隔。通过设置为 0 来禁用自动重新连接
  // for more options and details, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
})

const subscribeConfig = ref({
  topic: 'topic/mqttx',
  qos: 0 as any
})

const subscribedSuccess = ref(false)
const receivedMessages = ref('')

const publishConfig = ref({
  topic: 'topic/browser',
  qos: 0 as any,
  payload: '{ "msg": "Hello, I am browser." }'
})

let client = ref({ connected: false } as mqtt.MqttClient)

const retryTimes = ref(0)

const initData = () => {
  client.value = {
    connected: false
  } as mqtt.MqttClient
  retryTimes.value = 0
  subscribedSuccess.value = false
}

/**
 * @description: 连接MQTT 服务器
 */
const createConnection = () => {
  const { protocol, host, port, ...options } = connection
  const connectUrl = `${protocol}://${host}:${port}/mqtt`

  client.value = mqtt.connect(connectUrl, options)

  if (!unref(client).on) return

  unref(client).on('connect', () => {
    console.log('连接成功')
  })

  unref(client).on('reconnect', handleOnReConnect)

  unref(client).on('error', error => {
    console.log('连接失败:', error)
  })

  unref(client).on('message', (topic: string, message) => {
    receivedMessages.value = unref(receivedMessages).concat(message.toString())
    console.log(`收到消息: ${message} 从主题: ${topic}`)
  })
}

/**
 * @description: 断开 连接MQTT 服务器
 */
const destroyConnection = () => {
  unref(client).end(false, () => {
    initData()
    console.log('断开连接成功')
  })
}

const handleOnReConnect = () => {
  console.log('开始重连')
  retryTimes.value += 1
  if (retryTimes.value <= 5) return
  unref(client).end()
  initData()
  console.log('连接maxReconnectTimes限制, 停止重试')
}

/**
 * @description: 订阅主题
 */
const subscribe = () => {
  const { topic, qos } = subscribeConfig.value

  unref(client).subscribe(topic, { qos }, (error: Error, granted: mqtt.ISubscriptionGrant[]) => {
    if (error) {
      return console.log('订阅错误:', error)
    }
    subscribedSuccess.value = true
    console.log('订阅成功:', granted)
  })
}

/**
 * @description: 取消订阅
 */
const unSubscribe = () => {
  const { topic, qos } = subscribeConfig.value

  unref(client).unsubscribe(topic, { qos }, error => {
    subscribedSuccess.value = false
    if (error) {
      return console.log('退订错误:', error)
    }
    console.log(`退订成功: ${topic}`)
  })
}

const doPublish = () => {
  const { topic, qos, payload } = publishConfig.value

  client.value.publish(topic, payload, { qos }, error => {
    if (error) {
      return console.log('发布错误:', error)
    }
    console.log(`发布消息: ${payload}`)
  })
}

onUnmounted(() => {
  unref(client)?.end()
})
</script>
