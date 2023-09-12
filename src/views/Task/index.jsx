import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../slices/taskSlice";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import TaskForm from "../../components/TaskForm";

const TaskTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  let { projectId } = useParams();
  const formatDate = (date) => {
    return moment(date).format(" hh:mm a YYYY-MM-DD ");
  };
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = useSelector((state) => state?.tasks?.tasks);
  const total = useSelector((state) => state?.tasks?.total);

  useEffect(() => {
    setPagination({
      ...pagination,
      total,
    });
  }, [total]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
    total: total,
  });
  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };
  const showModal = () => {
    setSelectedTask(null);
    setIsModalVisible(true);
  };

  useEffect(() => {
    dispatch(getAllTasks(projectId, pagination.current, pagination.pageSize));
  }, [dispatch, pagination]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Link to={`/Projects/${projectId}/tasks/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div
          style={{ maxWidth: "200px", overflow: "auto", maxHeight: "100px" }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (createdBy) => {
        return <div>{createdBy?.name}</div>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return <div>{formatDate(createdAt)}</div>;
      },
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      render: (updatedBy) => {
        return <div>{updatedBy?.name}</div>;
      },
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => {
        return <div>{formatDate(updatedAt)}</div>;
      },
    },

    {
      title: "Assigned To ",
      dataIndex: "assignedto",
      key: "assignedto",
      render: (assignedto) => {
        return <div>{assignedto?.name}</div>;
      },
    },
    {
      title: "options",
      dataIndex: "row",
      key: "row",
      render: (_, row) => {
        return (
          <Button
            onClick={() => {
              const selectedTask = tasks.filter((item) => row.id === item.id);
              setSelectedTask(selectedTask[0]);
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create New Task
      </Button>{" "}
      <Table
        columns={columns}
        dataSource={tasks}
        pagination={pagination}
        onChange={handleTableChange}
      />
      {selectedTask
        ? isModalVisible && (
            <TaskForm
              visible={isModalVisible}
              projectId={projectId}
              setVisible={setIsModalVisible}
              task={selectedTask}
              dispatch={dispatch}
            />
          )
        : isModalVisible && (
            <TaskForm
              visible={isModalVisible}
              projectId={projectId}
              setVisible={setIsModalVisible}
              dispatch={dispatch}
            />
          )}
    </>
  );
};

export default TaskTable;
