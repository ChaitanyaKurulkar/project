import React, { useState } from "react";
import Header from "../../components/Header";
import { Button, Col, Row } from "react-bootstrap";
import { handleInputChange, handleSubmit } from "./ProjectFunctions";
import "./AddProject.css";

const AddProject = () => {
  const [inputField, setInputField] = useState({
    projectName: "",
    reason: "",
    type: "",
    division: "",
    category: "",
    priority: "",
    department: "",
    startDate: "",
    endDate: "",
    location: "",
    status: 1,
  });
  const [inputError, setInputError] = useState<any>({});
  const [apiStatus, setApiStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const resetForm = () => {
    setInputField({
      projectName: "",
      reason: "",
      type: "",
      division: "",
      category: "",
      priority: "",
      department: "",
      startDate: "",
      endDate: "",
      location: "",
      status: 1,
    });
    setInputError({});
  };

  return (
    <>
      <Header title="Create Project" />
      <div className="container mb-4" style={{ marginTop: "-20px" }}>
        <div className="card">
          <div className="card-body">
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                await handleSubmit(
                  inputField,
                  setApiStatus,
                  setInputError,
                  resetForm
                );
              }}
            >
              <Row className="mb-3">
                <Col xs={12} md={8} className="mb-2 mb-md-0">
                  <input
                    className={`form-control ${
                      inputError.projectName ? "is-invalid" : ""
                    }`}
                    placeholder="Project Name"
                    type="text"
                    name="projectName"
                    value={inputField.projectName}
                    onChange={(event) =>
                      handleInputChange(event, setInputField, inputField)
                    }
                  />
                  {inputError.projectName && (
                    <div className="invalid-feedback">
                      {inputError.projectName}
                    </div>
                  )}
                </Col>
                <Col xs={12} md={4}>
                  <Button
                    type="submit"
                    className="btn btn-primary rounded-pill py-2 px-4 w-50"
                    style={{ marginLeft: "10rem" }}
                    disabled={apiStatus.loading}
                  >
                    {apiStatus.loading ? "Saving..." : "Save Project"}
                  </Button>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={12} md={6} lg={4} className="mb-3 mb-lg-0">
                  <label className="fs-6">Reason</label>
                  <select
                    className="form-select"
                    name="reason"
                    value={inputField.reason}
                    onChange={(event) =>
                      handleInputChange(event, setInputField, inputField)
                    }
                  >
                    <option value="">Select Reason</option>
                    <option value="Business">For Business</option>
                    <option value="Personal">For Personal</option>
                    <option value="Dealership">For Dealership</option>
                    <option value="Transport">For Transport</option>
                  </select>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-3 mb-lg-0">
                  <label className="fs-6">Type</label>
                  <select
                    className="form-select"
                    name="type"
                    value={inputField.type}
                    onChange={(event) =>
                      handleInputChange(event, setInputField, inputField)
                    }
                  >
                    <option value="">Select Type</option>
                    <option value="Internal">Internal</option>
                    <option value="External">External</option>
                  </select>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-3 mb-lg-0">
                  <label className="fs-6">Division</label>
                  <select
                    className="form-select"
                    name="division"
                    value={inputField.division}
                    onChange={(event) =>
                      handleInputChange(event, setInputField, inputField)
                    }
                  >
                    <option value="">Select Division</option>
                    <option value="Filters">Filters</option>
                  </select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} md={6} lg={4} className="mb-3 mb-lg-0">
                  <label className="fs-6">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={inputField.category}
                    onChange={(event) =>
                      handleInputChange(event, setInputField, inputField)
                    }
                  >
                    <option value="">Select Category</option>
                    <option value="QA">Quality A</option>
                    <option value="QB">Quality B</option>
                    <option value="QC">Quality C</option>
                  </select>
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-3 mb-lg-0">
                  <label className="fs-6">Priority</label>
                  <select
                    className="form-select"
                    name="priority"
                    value={inputField.priority}
                    onChange={(event) =>
                      handleInputChange(event, setInputField, inputField)
                    }
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <label className="fs-6">Department</label>
                  <select
                    className="form-select"
                    name="department"
                    value={inputField.department}
                    onChange={(event) =>
                      handleInputChange(event, setInputField, inputField)
                    }
                  >
                    <option value="">Select Department</option>
                    <option value="Business">Business</option>
                    <option value="Quality">Quality</option>
                    <option value="HR">HR</option>
                  </select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} md={6} lg={4} className="mb-3 mb-lg-0">
                  <label className="fs-6">Start Date as per Project Plan</label>
                  <input
                    type="date"
                    className={`form-control ${
                      inputError.startDateEndDate ? "is-invalid" : ""
                    }`}
                    name="startDate"
                    value={inputField.startDate}
                    onChange={(event) =>
                      handleInputChange(event, setInputField, inputField)
                    }
                  />
                </Col>
                <Col xs={12} md={6} lg={4} className="mb-3 mb-lg-0">
                  <label className="fs-6">End Date as per Project Plan</label>
                  <input
                    type="date"
                    className={`form-control ${
                      inputError.startDateEndDate ? "is-invalid" : ""
                    }`}
                    name="endDate"
                    value={inputField.endDate}
                    onChange={(event) =>
                      handleInputChange(event, setInputField, inputField)
                    }
                  />
                  {inputError.startDateEndDate && (
                    <div className="invalid-feedback">
                      {inputError.startDateEndDate}
                    </div>
                  )}
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <label className="fs-6">Location</label>
                  <select
                    className="form-select"
                    name="location"
                    value={inputField.location}
                    onChange={(event) =>
                      handleInputChange(event, setInputField, inputField)
                    }
                  >
                    <option value="">Select Location</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}></Col>
                <Col md={2}></Col>
                <Col xs={12} md={1}>
                  <h6>Status: {inputField.status}</h6>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProject;
