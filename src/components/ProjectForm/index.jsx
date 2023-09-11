import React from "react";
import { Modal, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { createProject } from "../../slices/projectSlice";

const ProjectForm = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    form.resetFields();
    dispatch(createProject(values));
  };

  return (
    <Modal
      visible={visible}
      title="Create a New Project"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        setVisible(false);
      }}
      onOk={() => {
        form.submit();
        setVisible(false);
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="project_form"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: "Please enter the project name!" },
          ]}
        >
          <Input />
        </Form.Item>
        {/* Add more Form.Item components for other fields as needed */}
      </Form>
    </Modal>
  );
};

export default ProjectForm;
