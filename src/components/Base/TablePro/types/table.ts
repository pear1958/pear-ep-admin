export namespace Table {
  export interface PageParams {
    pageNum: number
    pageSize: number
    total: number
  }

  export interface StateProps {
    tableData: Recordable[]
    loading: boolean
    pageParams: PageParams
    searchParams: Recordable
    searchInitParams: Recordable
    totalParams: Recordable
    icon?: Recordable
  }

  export interface ParamsKeyMap extends Partial<PageParams> {
    total?: number
  }
}
