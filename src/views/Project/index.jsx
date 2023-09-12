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
  const total = useSelector((state) => state?.projects?.total);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
    total: total,
  });

  useEffect(() => {
    dispatch(fetchProjects(pagination.current, pagination.pageSize));
  }, [dispatch, pagination]);

  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
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
        rowKey={(row) => row}
      />
      <ProjectForm visible={isModalVisible} setVisible={setIsModalVisible} />
    </div>
  );
};

export default ProjectTable;
