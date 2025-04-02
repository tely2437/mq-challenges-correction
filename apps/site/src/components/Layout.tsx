import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Layout as AntLayout, Menu } from 'antd'
import { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const { Header, Content, Footer } = AntLayout

export const Layout: FC = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <AntLayout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Menu theme="dark" mode="horizontal" style={{ background: 'inherit', flex: 1 }}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/todo">To-Do list</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
        <div style={{ cursor: 'pointer', fontSize: '1.5rem', color: '#fff' }} onClick={toggleTheme}>
          {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
        </div>
      </Header>
      <Content
        style={{
          flex: 1,
          padding: '0 50px',
          marginTop: 64,
          display: 'flex',
          flexDirection: 'column',
        }}
        className={isDarkMode ? 'dark-mode' : 'light-mode'}
      >
        <div
          style={{
            background: isDarkMode ? '#333' : '#fff',
            padding: 24,
            flex: 1,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          background: isDarkMode ? '#333' : '#fff',
          color: isDarkMode ? '#fff' : '#000',
        }}
      >
        Footer
      </Footer>
    </AntLayout>
  )
}
