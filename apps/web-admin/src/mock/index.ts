import MockAdapter from 'axios-mock-adapter'
import http from '@/api'
import { getMockInsData } from './modules/insurance'
import { userInfo } from './modules/userInfo'
import { menuList } from './modules/menuList'
import { buttonData } from './modules/buttonData'

export const startMock = () => {
  const mock = new MockAdapter(http.service, { delayResponse: 1000 })

  mock
    .onPost('/user/login', {
      username: 'Admin',
      password: '123456',
      code: 'phfp'
    })
    .reply(200, {
      code: 200,
      msg: 'ok',
      data: true
    })

  mock.onPost('/user/logout').reply(200, {
    code: 200,
    msg: 'ok',
    data: true
  })

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
