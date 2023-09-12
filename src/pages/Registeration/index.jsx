import React, { useState } from "react";
import { Form, Input, Button, message, Row } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../slices/authSlice";

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);

    try {
      await dispatch(register(values));
      await navigate("/Login");
      message.success("Registration successful");
    } catch (error) {
      console.error("Error registering user:", error);
      message.error("Registration failed. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <Row justify="center" align="middle">
      <Form
        name="registration_form"
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
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter your password!" },
            {
              min: 6,
              message: "Password must be at least 6 characters long",
            },
          ]}
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
              Register
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Row>
  );
};

export default RegistrationForm;
