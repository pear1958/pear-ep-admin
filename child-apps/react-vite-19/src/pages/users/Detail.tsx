import { useParams } from 'react-router-dom'

const UserDetail = () => {
  // 获取路由参数
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h1>用户详情</h1>
      <p>用户 ID: {id}</p>
    </div>
  )
}

export default UserDetail
