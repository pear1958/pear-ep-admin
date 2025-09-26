export type IMapData = {
  addr: string
  lng: number | string
  lat: number | string
}

export interface AddrOption extends LabelValue<string> {
  lng: number
  lat: number
}
