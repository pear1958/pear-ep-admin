import { defineAsyncComponent } from 'vue'
import type { AsyncComponentLoader, Component, ComponentPublicInstance } from 'vue'
import Loading, { LoadingSize } from '@/components/Base/Loading/index.vue'

// delay默认设置的是200ms, 也就是说200ms之内如果最终组件(loader)已经加载完成, 就不会显示loadingComponent了
// 避免了组件替换太快造成的闪烁。如果最终组件(loader)加载时间用了1秒才加载完, 那么会先有200ms的空白
// 之后loadingComponent会显示800ms, 然后再替换为最终组件(loader)

export interface Options {
  loading?: boolean // 是否显示LoadingComponent
  loadingComponent?: Component
  errorComponent?: Component
  delay?: number
  timeout?: number
  size?: LoadingSize
  retry?: boolean
}

export const createAsyncComponent = <
  T extends Component = {
    new (): ComponentPublicInstance
  }
>(
  loader: AsyncComponentLoader<T>,
  options: Options = {}
) => {
  const {
    loading = true,
    loadingComponent,
    errorComponent,
    delay = 100,
    timeout = 30000,
    size = 'default',
    retry = false
  } = options

  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? loadingComponent ?? <Loading size={size} /> : undefined,
    errorComponent,
    delay,
    timeout,
    onError: !retry
      ? () => {}
      : (error, retry, fail, attempts) => {
          error.message.match(/fetch/) && attempts <= 3 ? retry() : fail()
        }
  })
}
