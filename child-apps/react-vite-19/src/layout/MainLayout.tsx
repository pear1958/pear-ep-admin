import { Outlet, Link } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      {/* 导航栏 */}
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '10px' }}>
          首页
        </Link>
        <Link to="/about" style={{ marginRight: '10px' }}>
          关于我们
        </Link>
        <Link to="/users">用户列表</Link>
      </nav>

      {/* 路由出口 - 子组件将在这里渲染 */}
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
