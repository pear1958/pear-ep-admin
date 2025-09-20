export type Recordable<T = any> = Record<string, T>

export type Nullable<T> = T | null

export type TargetContext = '_self' | '_blank'

export interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

export type TimeoutHandle = ReturnType<typeof setTimeout>