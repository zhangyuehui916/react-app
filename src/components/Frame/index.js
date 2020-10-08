import React from 'react';
import { Layout, Menu } from 'antd';
import { withRouter} from "react-router-dom";
import '../../css/frame.css'
import '../../font/iconfont.css'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AppstoreOutlined ,
  HeartOutlined,
  ScheduleOutlined ,
  SolutionOutlined, 
  MenuOutlined ,

} from  '@ant-design/icons';;

// import HomePage from '../component/homePage.js'
const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

class Frame extends React.Component {
  state = {
    collapsed: false,
  };
//   constructor(props){
//     super(props);
//   }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <Sider 
        breakpoint='xl'
        // collapsedWidth="0"
        onBreakpoint={(broken) => {
          // 判断响应式，侧边栏收缩
          this.setState({collapsed: broken})
        }}

        trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <span className='iconfont icon-logo1'><i>后台管理</i></span>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />} onClick={()=>{this.props.history.push('/admin/homePage')}}>
                
             首页
            </Menu.Item>
            <SubMenu key="sub1" icon={<HeartOutlined />} title="关于" >
            <Menu.Item key="2-1" onClick={()=>{this.props.history.push('/admin/about/vision')}}>愿景</Menu.Item>
            <Menu.Item key="2-2" onClick={()=>{this.props.history.push('/admin/about/relation')}}>联系</Menu.Item>

          </SubMenu>
            {/* <Menu.Item key="2" icon={<HeartOutlined />}>
              关于
            </Menu.Item> */}
            <Menu.Item key="3" icon={<AppstoreOutlined />} onClick={()=>{this.props.history.push('/admin/city')}}>
              城市管理
            </Menu.Item>
            <Menu.Item key="4" icon={<ScheduleOutlined />} onClick={()=>{this.props.history.push('/admin/order')}}>
              订单管理
            </Menu.Item>
            <Menu.Item key="5" icon={<SolutionOutlined />} onClick={()=>{this.props.history.push('/admin/discuss')}}>
              评论
            </Menu.Item>
            <Menu.Item key="6" icon={<MenuOutlined />} onClick={()=>{this.props.history.push('/admin/rest')}}>
              其他
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
          {this.props.children}
          {/* {this.props} */}
          {/* <button onClick={()=>{console.log(this.props);}}>按钮</button> */}
           
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(Frame) ;