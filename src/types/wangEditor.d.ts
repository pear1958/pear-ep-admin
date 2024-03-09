import type { SlateDescendant, SlateElement } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
  // 扩展 Text
  interface SlateText {
    text: string
  }

  // 扩展 Element
  interface SlateElement {
    type: string
    children: SlateDescendant[]
  }
}

export type ImageElement = SlateElement & {
  src: string
  alt: string
  url: string
  href: string
}

export declare type InsertFnType = (url: string, alt: string, href: string) => void
