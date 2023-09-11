import React from "react";
import { Modal, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { createTask } from "../../slices/taskSlice";

const TaskForm = ({ visible, setVisible, projectId, task }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const isEdit = !!task; // Check if it's an edit operation

  const onFinish = (values) => {
    if (isEdit) {
      //   dispatch(updateTask({ id, ...values }));
    } else {
      dispatch(createTask(projectId, values));
    }
    form.resetFields();
    setVisible(false);
  };

  return (
    <Modal
      title={isEdit ? "Edit Task" : "Create Task"}
      visible={visible}
      onCancel={() => {
        form.resetFields();
        setVisible(false);
      }}
      onOk={() => form.submit()}
    >
      <Form form={form} name="myForm" onFinish={onFinish} initialValues={task}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter the title!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter the description!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        {isEdit && (
          <>
            <Form.Item
              label="Assigned To"
              name="assignedTo"
              rules={[
                {
                  required: true,
                  message: "Please select an assignee!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select a status!",
                },
              ]}
            >
              <Select>
                <Select.Option value="ToDo">ToDo</Select.Option>
                <Select.Option value="InProgress">InProgress</Select.Option>
                <Select.Option value="InQA">InQA</Select.Option>
                <Select.Option value="Done">Done</Select.Option>
                <Select.Option value="Deployed">Deployed</Select.Option>
                <Select.Option value="Blocked">Blocked</Select.Option>
              </Select>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default TaskForm;
