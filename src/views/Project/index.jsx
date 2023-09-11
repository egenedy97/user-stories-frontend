import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ProjectForm from "../../components/ProjectForm";
import { fetchProjects } from "../../slices/projectSlice";
import { Link } from "react-router-dom"; // Import Link

const ProjectTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state?.projects?.projects);

  const [pagination, setPagination] = useState({
    current: 1,
    defaultPageSize: 100,
    total: 0,
  });

  useEffect(() => {
    dispatch(fetchProjects(pagination.current, pagination.defaultPageSize));
  }, [dispatch, pagination]);

  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      defaultPageSize: pagination.pageSize,
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <Link to={`/Projects/${record.id}/tasks`}>{text}</Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create New Project
      </Button>
      <Table
        columns={columns}
        dataSource={projects}
        pagination={pagination} // Pass the pagination object
        onChange={handleTableChange} // Handle table pagination change
      />
      <ProjectForm visible={isModalVisible} setVisible={setIsModalVisible} />
    </div>
  );
};

export default ProjectTable;
