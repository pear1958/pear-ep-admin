import { defineComponent } from 'vue'
import { showDialog, closeDialog } from '@/utils/ui/dialog'
import { showLoading, closeLoading } from '@/utils/ui/loading'

export default defineComponent({
  name: 'JsxDialog',
  setup() {
    const openDialog = () => {
      showDialog(<div onClick={closeDialog}>关闭</div>, {
        title: '标题',
        width: '500'
      })
    }

    const openLoading = () => {
      showLoading()
      setTimeout(() => {
        closeLoading()
      }, 3000)
    }

    return () => (
      <div>
        <el-button type="primary" onClick={openDialog}>
          打开弹窗
        </el-button>
        <el-button type="primary" onClick={openLoading}>
          Loading(3s后自动关)
        </el-button>
      </div>
    )
  }
})
