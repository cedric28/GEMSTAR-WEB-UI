import React, { useEffect } from 'react';
import { Button, Card, Badge, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MainBody from '../../UI/MainBody';
import { getProjectAsAdmin, getProjects } from '../../../store/action';
import { dateFormatDistance } from '../../Shared/Helpers/dateFormat';

const Projects = props => {
  const { getProjectAsAdmin, getProjects, projectList, user_level_acc } = props;
  const fetchProjects =
    user_level_acc === 'owner'
      ? getProjectAsAdmin
      : user_level_acc === 'emp'
      ? getProjects
      : getProjects;

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <MainBody>
      <Row>
        <Col>
          <div>
            <Card.Title className="ms-2">Projects</Card.Title>
            <hr className="mt-0" />
          </div>
        </Col>
      </Row>

      {user_level_acc === 'csm' ? (
        <Row>
          <Col>
            <div class="d-flex justify-content-end mb-2">
              <Link to={`/create`}>
                <Button variant="primary">Create Project</Button>
              </Link>
            </div>
          </Col>
        </Row>
      ) : (
        ''
      )}

      {Object.keys(projectList).length > 0 ? (
        <Row>
          {Object.keys(projectList).map((res, index) => {
            return (
              <Col
                key={`project-${index}`}
                xs={12}
                md={6}
                lg={4}
                className="my-2">
                <Link
                  to={`/manage/${projectList[res].project_id}`}
                  className="list-group-item list-group-item-action flex-column align-items-start">
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
                      .replace(/<p>/g, ' ')
                      .replace(/<\/p>/g, ' ')
                      .replace(/<h1>/g, ' ')
                      .replace(/<\/h1>/g, ' ')
                      .replace(/<h2>/g, ' ')
                      .replace(/<\/h2>/g, ' ')
                      .replace(/<h3>/g, ' ')
                      .replace(/<\/h3>/g, ' ')
                      .replace(/<br>/g, ' ')
                      .replace(/<ol>/g, ' ')
                      .replace(/<\/ol>/g, ' ')
                      .replace(/<li>/g, ' ')
                      .replace(/<\/li>/g, ' ')
                      .replace(/<\/strong>/g, ' ')
                      .replace(/<strong>/g, ' ')
                      .replace(/<em>/g, ' ')
                      .replace(/<\/em>/g, ' ')
                      .slice(0, 50)}
                  </p>
                  <p className="mb-0 fw-normal text-muted">
                    <Badge bg={projectList[res].status_acr}>
                      {projectList[res].status_name}
                    </Badge>{' '}
                    {projectList[res].first_name}
                  </p>
                </Link>
              </Col>
            );
          })}
        </Row>
      ) : (
        <h5 className="border py-3 text-center">No Projects</h5>
      )}
    </MainBody>
  );
};

const mapStateToProps = state => {
  return {
    projectList: state.projectList,
    user_level_acc: state.auth.user_level_acc
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProjectAsAdmin: () => dispatch(getProjectAsAdmin()),
    getProjects: () => dispatch(getProjects())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
