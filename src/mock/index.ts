import MockAdapter from 'axios-mock-adapter'
import http from '@/api'
import { isDev } from '@/utils'
import { getMockInsData } from './modules/insurance'
import { userInfo } from './modules/userInfo'
import { menuList } from './modules/menuList'
import { buttonData } from './modules/buttonData'

export const startMock = () => {
  if (!isDev) return
  const mock = new MockAdapter(http.service, { delayResponse: 1000 })

  mock.onGet('/auth/menu').reply(200, {
    code: 200,
    msg: 'ok',
    data: menuList
  })

  mock.onGet('/auth/button').reply(200, {
    code: 200,
    msg: 'ok',
    data: buttonData
  })

  mock.onGet('/user/info').reply(200, {
    code: 200,
    msg: 'ok',
    data: userInfo
  })

  mock.onGet('/insurance/list').reply(({ params }) => {
    return [
      200, // http-status
      {
        code: 200,
        msg: 'ok',
        data: {
          list: getMockInsData(params),
          total: 158
        }
      }
    ]
  })
}
