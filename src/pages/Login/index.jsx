import React, { useState } from "react";
import { Form, Input, Button, message, Row } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);

    try {
      await dispatch(login(values));
      await navigate("/Projects");
      await message.success("Login successful");
    } catch (error) {
      console.error("Error authenticating user:", error);
      console.log(error);
      message.error(
        "Login failed. Please check your credentials and try again."
      );
    }

    setLoading(false);
  };

  return (
    <Row justify="center" align="middle">
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Row justify={"center"}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "330px" }}
            >
              Login
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Row>
  );
};

export default LoginForm;
