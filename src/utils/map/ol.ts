import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { XYZ } from 'ol/source'
import 'ol/ol.css'

class olUtils {
  constructor() {}

  initMap(id: string) {
    new Map({
      target: id,
      view: new View({
        projection: 'EPSG:4326', // 使用这个坐标系
        center: [104.704968, 31.540962], // 西南科技大学
        zoom: 8
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}' // 高德底图
          })
        })
      ]
    })
  }
}

export default olUtils
