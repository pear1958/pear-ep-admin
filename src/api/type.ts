export interface ResultData<T> {
  code: string
  msg: string
  data: T
}

export namespace Login {
  export interface reqForm {
    username: string
    password: string
  }

  export interface resType {
    token: string
    userInfo: object
  }

  export interface authButtons {
    [key: string]: string[]
  }
}
