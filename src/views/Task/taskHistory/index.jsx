import { Table } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById } from "../../../slices/taskSlice";
import moment from "moment";

const TaskHistory = () => {
  let { projectId, taskId } = useParams();
  const dispatch = useDispatch();
  const formatDate = (date) => {
    return moment(date).format(" hh:mm a YYYY-MM-DD ");
  };

  useEffect(() => {
    dispatch(getTaskById(projectId, taskId));
  }, [dispatch, projectId]);
  const tasks = useSelector((state) => state?.tasks?.tasks);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Previous Status",
      dataIndex: "previousStatus",
      key: "previousStatus",
    },
    {
      title: "Current Status",
      dataIndex: "currentStatus",
      key: "currentStatus",
    },
    {
      title: "Change Date Time",
      dataIndex: "changeDateTime",
      key: "changeDateTime",
      render: (changeDateTime) => {
        return <div>{formatDate(changeDateTime)}</div>;
      },
    },
    {
      title: "Changed By",
      dataIndex: "changedBy",
      key: "changedBy",
      render: (changedBy) => <div>{changedBy.username}</div>,
    },
  ];

  return <Table columns={columns} dataSource={tasks[0]?.history} />;
};

export default TaskHistory;
