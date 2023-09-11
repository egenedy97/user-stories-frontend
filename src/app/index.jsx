import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import NotFoundPage from "../pages/NotFoundPage";
import RegistrationForm from "../pages/Registeration";
import LoginForm from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { logout, setUser } from "../slices/authSlice";

const { Header, Content, Footer } = Layout;

const App = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [selectedKey, setSelectedKey] = useState("1");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let user = window.localStorage.getItem("vois-user");
    // if (!lo) {
    //   dispatch(logout);
    //   setSelectedKey("2");
    //   navigate("/Login");
    // }
    if (user) {
      dispatch(setUser(user));
    }
    if (!user) {
      dispatch(logout());
      setSelectedKey("2");
      navigate("/Login");
    }
  }, [dispatch, isAuth, navigate]);

  return (
    <Layout className="layout">
      <Header>
        {!isAuth ? (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedKey]}
          >
            <Menu.Item key="1">
              <Link to="/Register">Register</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/Login">Login</Link>
            </Menu.Item>
          </Menu>
        ) : (
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedKey]}
          >
            <Menu.Item key="3">
              <Button
                onClick={() => {
                  dispatch(logout());
                  navigate("/Login");
                  setSelectedKey("2");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </Menu.Item>
          </Menu>
        )}
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div className="site-layout-content">
          {!isAuth ? (
            <Routes>
              <Route path="/Register" element={<RegistrationForm />} />
              <Route path="/Login" element={<LoginForm />} />
              <Route path="*" element={<NotFoundPage />} />{" "}
            </Routes>
          ) : (
            <Routes>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}

          {/* <Navigate to={}/> */}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Footer Content</Footer>
    </Layout>
  );
};

export default App;
