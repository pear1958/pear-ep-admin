declare type Nullable<T> = T | null

declare type Recordable<T = any> = Record<string, T>

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

/**
 * 用法示例: type: Function as PropType<Fn>
 */
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

/**
 * 用法示例: type: Function as PropType<PromiseFn>  eg: loginApi
 * interface 也可以用来描述 独立的 函数类型  https://wangdoc.com/typescript/interface
 */
declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>

declare interface ChangeEvent extends Event {
  target: HTMLInputElement
}

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
