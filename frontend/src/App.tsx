import {
  ConfigProvider,
  theme,
  
} from "antd"
import { Content } from "antd/es/layout/layout";
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import { UserProvider } from "./hooks/auth";

import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import SignupPage from "./pages/Auth/SignupPage";
import UserList from "./pages/User/List";
import BlogList from "./pages/Blog/Manager/List";
import BlogNew from "./pages/Blog/Manager/New";
import UserBlogList from "./pages/Blog/UserBlog";
import BlogEdit from "./pages/Blog/Manager/Edit";
import BlogDetail from "./pages/Blog/Detail";
import Profile from "./pages/Profile/Index";

const {  darkAlgorithm } = theme;
const customizeTheme = {
  token: {
    //暗灰藍色
    colorPrimary: '#1f2937',
    // colorSecondary: '#d1ddeb',
    // colorPrimaryBg: '#000000',
    // colorLink: '#d1ddeb',
    
  },
};

export const App = () => {

  return (
    <UserProvider>
      <ConfigProvider
      theme={customizeTheme}
      >
        <BrowserRouter>
          <NavBar />
          <Content style={{
            // minHeight:"calc(100vh - 46px)",
            padding: "14px 16px",
        }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/user/profile" element={<Profile />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/blogs" element={<UserBlogList />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/manager/blogs/" element={<BlogList />} />
              <Route path="/manager/blogs/new" element={<BlogNew />} />
              <Route path="/manager/blogs/edit/:id" element={<BlogEdit />} />
            </Routes>
          </Content>
          {/* <Footer
            style={{
              borderTop: '1px solid #e8e8e8',
              position: 'fixed',
              left: 0,
              bottom: 0,
              width: '100%',
              backgroundColor: 'white',
              textAlign: 'center'
            }}
          >...footer...</Footer> */}
        </BrowserRouter>

      </ConfigProvider >
    </UserProvider>
  )
}

export default App;