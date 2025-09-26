export const getMockInsData = (params: Recordable) => {
  return new Array(params.pageSize).fill('').map((_, index) => {
    return {
      index,
      id: Math.random(),
      shopId: null,
      shopName: '投保测试4S店',
      benefitKey: 'SXX_2',
      benefitName: '随心修',
      vin: Math.random(),
      plateNumber: null,
      vehicleModel: '奥迪/A3新能源(进口)/2017款 Sportback e-tron 舒适型',
      vehicleOwnerPhone: '15848725012',
      vehicleOwnerName: '凉凉',
      vehicleOwnerIdType: 'ID',
      vehicleOwnerIdNo: '431224198912147726',
      vehicleRegisterDate: '2025-02-21T00:00:00+0800',
      vehiclePurchasePrice: 20,
      vehicleInvoiceDate: '2025-02-21T00:00:00+0800',
      status: 'INSURE_SUCCESS',
      insureTime: '2025-02-21T13:45:53+0800',
      effectDate: '2025-02-22T00:00:00+0800'
    }
  })
}
