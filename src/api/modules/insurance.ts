import http from '..'

export const getInsuranceList = (params: Recordable) => {
  return http.get('/system/user/insurance/list', params)
}
