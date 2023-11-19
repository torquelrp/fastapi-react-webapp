import {
  Menu,
  MenuProps,
  Button,
  Avatar,
} from "antd"

import { HomeFilled, UserOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/auth";

const defaultMenu: MenuProps['items'] = [
  {
    key: 'home',
    label: <Link to="/" />,
    icon: <HomeFilled />,
  },
  {
    key: 'blogs',
    label: <Link to="/blogs"> Blog </Link>,
    children: [
      {
        key: 'blogs:Blog List',
        label: <Link to="/blogs"> Blog List</Link>,
        // label: <Button onClick={logout}>Logout</Button>,
      },
      {
        key: 'blogs:Blog Manger',
        label: <Link to="/manager/blogs"> Blog Manger</Link>,
        // label: <Typography.Text ellipsis onClick={(e)=>navigate('/setting')}> {user?.email} </Typography.Text>,
      },
    ]
  },
  // {
  //   key: 'shoppingMall',
  //   label: <Link to="/shoppingMall"> Shopping mall </Link>,
  // }
];



const NavBar = () => {
  const { user, logout } = useContext(UserContext);
  const [current, setCurrent] = useState(window.location.pathname.split('/')[1] || 'home');
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const noAuthMenu: MenuProps['items'] = [
    ...defaultMenu,
    {
      key: 'login',
      label: <Link to="/login"> Login </Link>,
    },
    {
      key: 'signup',
      label: <Link to="/signup"> Signup </Link>,
    },
  ];

  const authMenu: MenuProps['items'] = [
    ...defaultMenu,
    {
      key: 'setting',
      // icon: <SettingOutlined />,
      label: user?.avatar_url && <Avatar src={user.avatar_url} style={{borderRadius:"100%"}} />,
      children: [
        {
          key: 'setting:settting',
          label: 
              <Link to='/user/profile'>
                {user?.nickname || user?.email}
              </Link>
        },
        {
          key: 'setting:logut',
          label: <Button onClick={logout}>Logout</Button>,
        },
      ]
    },
  ];

  const adminMenu: MenuProps['items'] = [
    ...authMenu,
    {
      key: 'users',
      label: <Link to="/users"> Users </Link>,
      icon: <UserOutlined />,
    },
  ];

  if (user?.id) {
    if (user?.permissions === 'admin') {
      return <>
        <Menu
          theme="light"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={adminMenu}
          style={{ justifyContent: 'flex-end' }}
        />
      </>
    }
    else {
      return (
        <>
          <Menu
            theme="light"
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={authMenu}
            style={{ justifyContent: 'flex-end' }}
          />
        </>
      )
    }
  } else {
    return (
      <>
        <Menu
          theme="light"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={noAuthMenu}
          style={{ justifyContent: 'flex-end' }}
        />
      </>
    )
  }

  // return ( <>
  //     {user?.username && (
  //       <Menu
  //       theme="light"
  //       onClick={onClick}
  //       // selectedKeys={[current]} //router current url TODO
  //       mode="horizontal"
  //       items={authMenu}
  //       style={{ justifyContent: 'flex-end'}}
  //       />
  //     )}
  //     {!user?.username && (
  //         <Menu
  //         theme="light"
  //         onClick={onClick}
  //         selectedKeys={[current]}
  //         mode="horizontal"
  //         items={noAuthMenu}
  //         style={{ justifyContent: 'flex-end'}}
  //         />
  //     )}
  // </> );
}

export default NavBar;