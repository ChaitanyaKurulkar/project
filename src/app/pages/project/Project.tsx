import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Col,
  Row,
  InputGroup,
  FormControl,
  Dropdown,
  Button,
} from "react-bootstrap";
import { getProjects, updateProjectStatus } from "../../../api/ProjectAPI";
import { ProjectType } from "../../types/types";

const Project = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [apiStatus, setAPIStatus] = useState<{
    loading: boolean;
    error: string;
  }>({ loading: false, error: "" });

  useEffect(() => {
    fetchProjects();
  }, [searchKeyword, currentPage]);

  const fetchProjects = async () => {
    setAPIStatus((prev) => ({ ...prev, loading: true }));
    try {
      const response = await getProjects(searchKeyword, currentPage);
      if (response.statusCode === 200) {
        const projects = response.data || [];
        const formattedProjects = projects.map((project: ProjectType) => ({
          ...project,
          status: project.status || { id: "", name: "N/A", description: "" },
        }));
        setProjects(formattedProjects);
        setTotalPages(response.totalPages || 5);
      } else {
        setAPIStatus((prev) => ({ ...prev, error: response.message }));
      }
    } catch (error) {
      setAPIStatus((prev) => ({ ...prev, error: (error as Error).message }));
    }
    setAPIStatus((prev) => ({ ...prev, loading: false }));
  };

  const handleStatusUpdate = async (
    projectId: string,
    statusId: string,
    index: number
  ) => {
    try {
      await updateProjectStatus(projectId, statusId);
      const updatedProjects = [...projects];
      const statusName =
        statusId === "2"
          ? "Running"
          : statusId === "3"
          ? "Closed"
          : statusId === "4"
          ? "Cancelled"
          : "Registered";
      updatedProjects[index] = {
        ...updatedProjects[index],
        status: { id: statusId, name: statusName, description: "" },
      };
      setProjects(updatedProjects);
    } catch (error) {
      setAPIStatus({ ...apiStatus, error: (error as Error).message });
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div>
        <Header title="Project Listing" />
        <div className="container mt-4">
          <div className="card" style={{ marginTop: "-55px" }}>
            <div className="card-body">
              <Row className="mb-2">
                <Col xs={12} md={6} className="text-start mb-2 mb-md-0">
                  <InputGroup>
                    <FormControl
                      placeholder="Search Projects"
                      aria-label="Search Projects"
                      className="fs-6"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <InputGroup.Text>
                      <i className="bi bi-search"></i>
                    </InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  className="text-end d-flex align-items-center justify-content-end"
                >
                  <label className="fs-6 me-2">Sort by:</label>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Priority
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Priority</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Category</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Reason</Dropdown.Item>
                      <Dropdown.Item href="#/action-4">Division</Dropdown.Item>
                      <Dropdown.Item href="#/action-5">
                        Department
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-6">Location</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Row
                className="mb-1 bg-secondary text-white text-center"
                style={{ fontSize: "0.85rem" }}
              >
                <Col xs={6} sm={4} md={2}>
                  <strong>Project Name</strong>
                </Col>
                <Col xs={6} sm={4} md={1}>
                  <strong>Reason</strong>
                </Col>
                <Col xs={6} sm={4} md={1}>
                  <strong>Division</strong>
                </Col>
                <Col xs={6} sm={4} md={1}>
                  <strong>Category</strong>
                </Col>
                <Col xs={6} sm={4} md={1}>
                  <strong>Priority</strong>
                </Col>
                <Col xs={6} sm={4} md={2}>
                  <strong>Department</strong>
                </Col>
                <Col xs={6} sm={4} md={1}>
                  <strong>Location</strong>
                </Col>
                <Col xs={6} sm={4} md={1}>
                  <strong>Status</strong>
                </Col>
                <Col xs={6} sm={4} md={2}></Col>
              </Row>

              <hr />
              {projects.length > 0 ? (
                projects.map((project: ProjectType, index: number) => (
                  <React.Fragment key={index}>
                    <Row
                      className="mb-1 align-items-center text-center"
                      style={{ fontSize: "0.80rem" }}
                    >
                      <Col xs={6} sm={4} md={2}>
                        <div>{project.projectName || "N/A"}</div>
                        <div className="text-muted">
                          {project.startDate
                            ? new Date(project.startDate).toLocaleDateString()
                            : "N/A"}{" "}
                          to{" "}
                          {project.endDate
                            ? new Date(project.endDate).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </Col>
                      <Col xs={6} sm={4} md={1}>
                        {project.reason || "N/A"}
                      </Col>
                      <Col xs={6} sm={4} md={1}>
                        {project.division || "N/A"}
                      </Col>
                      <Col xs={6} sm={4} md={1}>
                        {project.category || "N/A"}
                      </Col>
                      <Col xs={6} sm={4} md={1}>
                        {project.priority || "N/A"}
                      </Col>
                      <Col xs={6} sm={4} md={2}>
                        {project.department || "N/A"}
                      </Col>
                      <Col xs={6} sm={4} md={1}>
                        {project.location || "N/A"}
                      </Col>
                      <Col xs={6} sm={4} md={1}>
                        {project.status?.name || "N/A"}
                      </Col>
                      <Col
                        xs={6}
                        sm={4}
                        md={2}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <button
                          className="btn btn-primary btn-sm rounded-pill me-2 mb-2"
                          onClick={() =>
                            handleStatusUpdate(project.id, "2", index)
                          }
                        >
                          Start
                        </button>
                        <button
                          className="btn btn-outline-primary btn-sm rounded-pill me-2 mb-2"
                          onClick={() =>
                            handleStatusUpdate(project.id, "3", index)
                          }
                        >
                          Close
                        </button>

                        <button
                          className="btn btn-outline-primary btn-sm rounded-pill me-2 mb-2"
                          onClick={() =>
                            handleStatusUpdate(project.id, "4", index)
                          }
                        >
                          Cancel
                        </button>
                      </Col>
                    </Row>
                    <hr />
                  </React.Fragment>
                ))
              ) : (
                <div className="text-center">No projects available</div>
              )}

              <div className="d-flex justify-content-between align-items-center">
                <Button
                  variant="secondary btn-sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span style={{ fontSize: "0.75rem" }}>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="secondary btn-sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>

              {apiStatus.error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {apiStatus.error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
