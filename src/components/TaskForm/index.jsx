import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select } from "antd";
import { stateTransitions } from "../../constants";
import { createTask, updateTask } from "../../slices/taskSlice";
import userServices from "../../services/user";

const { Option } = Select;
const TaskForm = ({ visible, setVisible, projectId, task, dispatch }) => {
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const isEdit = task?.id ? true : false;

  const onFinish = (values) => {
    const { title, description, assignedToId, status } = values;
    if (isEdit) {
      dispatch(
        updateTask(projectId, task?.id, {
          title,
          description,
          assignedToId: +assignedToId,
          status: task?.status === status ? undefined : status,
        })
      );
    } else {
      dispatch(createTask(projectId, values));
    }
    form.resetFields();
    setVisible(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userServices.getAllUsers(1, 100);
        setUsers(response?.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (visible) {
      fetchUsers();
    }
    form.setFieldsValue({
      ...task,
    });
  }, [visible]);
  return (
    <Modal
      title={isEdit ? "Edit Task" : "Create Task"}
      visible={visible}
      onCancel={() => {
        form.resetFields();
        setVisible(false);
      }}
      onOk={() => {
        form.submit();
      }}
      destroyOnClose={true}
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
          <Form.Item label="assignedTo" name={"assignedToId"}>
            <Select>
              {users.map((item) => (
                <Option value={item?.id} key={item?.id}>
                  {item?.username}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {isEdit && task && (
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
              {stateTransitions[task.status].map((item) => {
                return <Option value={item}>{item}</Option>;
              })}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default TaskForm;
