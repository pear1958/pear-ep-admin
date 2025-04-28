import http from '..'

export const getInsuranceList = (params: Recordable) => {
  return http.get('/insurance/list', params)
}
