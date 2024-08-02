export namespace Table {
  export interface PageParams {
    pageNum: number
    pageSize: number
    total: number
  }

  export interface StateProps {
    tableData: any[]
    pageParams: PageParams
    searchParams: Recordable
    searchInitParams: Recordable
    totalParams: Recordable
    icon?: Recordable
  }
}
