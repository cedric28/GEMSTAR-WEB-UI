import React, { useEffect, useState } from "react";
import { Button, Card, Badge, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import MainBody from "../../UI/MainBody";
import {
  getProjectAsAdmin,
  getProjects,
  getProjectsTable,
} from "../../../store/action";
import {
  dateFormatDistance,
  dateFormatting,
} from "../../Shared/Helpers/dateFormat";

const Projects = (props) => {
  const {
    getProjectAsAdmin,
    getProjects,
    projectList,
    user_level_acc,
    getProjectsTable,
  } = props;
  const fetchProjects =
    user_level_acc === "owner"
      ? getProjectAsAdmin
      : user_level_acc === "emp"
      ? getProjects
      : getProjects;

  const [isTable, setIsTable] = useState(false);
  useEffect(() => {
    if (isTable) {
      getProjectsTable();
    } else {
      fetchProjects();
    }
  }, [isTable]);

  const CardList = () => {
    return Object.keys(projectList).length > 0 &&
      projectList[0].project_description ? (
      <Row>
        {Object.keys(projectList).map((res, index) => {
          return (
            <Col
              key={`project-${index}`}
              xs={12}
              md={6}
              lg={4}
              className="my-2"
            >
              <Link
                to={`/manage/${projectList[res].project_id}`}
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{projectList[res].project_name}</h5>
                  <small>
                    {dateFormatDistance(
                      projectList[res].date_created,
                      Date.now()
                    )}
                  </small>
                </div>
                <p className="mb-0 fw-normal text-muted">
                  {projectList[res].project_description
                    .replace(/<p>/g, " ")
                    .replace(/<\/p>/g, " ")
                    .replace(/<h1>/g, " ")
                    .replace(/<\/h1>/g, " ")
                    .replace(/<h2>/g, " ")
                    .replace(/<\/h2>/g, " ")
                    .replace(/<h3>/g, " ")
                    .replace(/<\/h3>/g, " ")
                    .replace(/<br>/g, " ")
                    .replace(/<ol>/g, " ")
                    .replace(/<\/ol>/g, " ")
                    .replace(/<li>/g, " ")
                    .replace(/<\/li>/g, " ")
                    .replace(/<\/strong>/g, " ")
                    .replace(/<strong>/g, " ")
                    .replace(/<em>/g, " ")
                    .replace(/<\/em>/g, " ")
                    .slice(0, 50)}
                </p>
                <p className="mb-0 fw-normal text-muted">
                  <Badge bg={projectList[res].status_acr}>
                    {projectList[res].status_name}
                  </Badge>{" "}
                  {projectList[res].first_name}
                </p>
              </Link>
            </Col>
          );
        })}
      </Row>
    ) : (
      <h5 className="border py-3 text-center">No Projects</h5>
    );
  };

  const TableComponent = () => {
    return (
      <Table bordered hover>
        <thead>
          <tr className="text-center">
            <th>Project Name</th>
            <th>Client Name</th>
            <th>Engine Model</th>
            <th>Status</th>
            <th>Date Range</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {projectList.length > 0 && projectList[0].total_price
            ? projectList.map((res) => {
                return (
                  <tr>
                    <td>
                      <Link to={`/manage/${res.project_id}`}>
                        {res.project_name}
                      </Link>
                    </td>
                    <td>{`${res.last_name}, ${res.first_name}`}</td>
                    <td>{res.engine_model || ""}</td>
                    <td className={`text-center text-${res.status_acr}`}>
                      {res.status_name}
                    </td>
                    <td className="text-center">
                      {dateFormatting(res.start_date, "mdy")} -{" "}
                      {dateFormatting(res.end_date, "mdy")}
                    </td>
                    <td className="text-center">{res.total_price}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </Table>
    );
  };

  return (
    <MainBody>
      <Row>
        <Col className="border-bottom mb-3 d-flex justify-content-between">
          <Card.Title className="ms-2">Projects</Card.Title>
          <div className="d-flex align-items-start mb-2">
            {user_level_acc === "owner" && (
              <React.Fragment>
                <Button
                  variant="secondary"
                  className="me-2 p-1"
                  size="sm"
                  onClick={() => setIsTable(true)}
                >
                  <i class="fas fa-list" />
                </Button>
                <Button
                  variant="secondary"
                  className="p-1"
                  size="sm"
                  onClick={() => setIsTable(false)}
                >
                  <i class="fab fa-buromobelexperte" />
                </Button>
              </React.Fragment>
            )}
            {user_level_acc === "csm" ? (
              <Link to={`/create`}>
                <Button variant="primary">Create Project</Button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </Col>
      </Row>

      {!isTable ? <CardList /> : <TableComponent />}
    </MainBody>
  );
};

const mapStateToProps = (state) => {
  return {
    projectList: state.projectList,
    user_level_acc: state.auth.user_level_acc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProjectAsAdmin: () => dispatch(getProjectAsAdmin()),
    getProjects: () => dispatch(getProjects()),
    getProjectsTable: () => dispatch(getProjectsTable()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
