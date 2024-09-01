import { Ion, Terrain, Viewer } from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNzI1NmEyOS00NTRmLTRmMGYtYjBkNy04ZDNmM2Y4MDNjYWMiLCJpZCI6Mzg0NTUsImlhdCI6MTcyNTE5NjU1MH0.1rlsehOPAxJtc7vZtLiOrXT89Ewk60Z_B6D3ugIvhzc'

class cesiumUtils {
  constructor() {
    // 服务器上托管 CesiumJS 静态文件的 URL
    window.CESIUM_BASE_URL = '/'
  }

  async initMap(id: string) {
    // 您的访问令牌可以在 https://ion.cesium.com/tokens 找到
    Ion.defaultAccessToken = token

    // 初始化 Cesium Viewer
    const viewer = new Viewer(id, {
      terrain: Terrain.fromWorldTerrain()
    })
  }
}

export default cesiumUtils
