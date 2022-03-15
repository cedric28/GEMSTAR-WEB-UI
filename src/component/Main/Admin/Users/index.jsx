import React, { useEffect } from 'react';
import {
  ListGroup,
  Table,
  Card,
  Row,
  Col,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MainBody from '../../../UI/MainBody';
import { getAllUserList } from '../../../../store/action';
import { dateFormatting } from '../../../Shared/Helpers/dateFormat';

const UserList = props => {
  const { getAllUserList, usersList } = props;

  useEffect(() => {
    getAllUserList();
  }, []);

  return (
    <MainBody>
      <Row>
        <Col>
          <Card.Title className="ms-2">Users</Card.Title>
          <hr className="mt-0" />
        </Col>
      </Row>

      <Row>
        <Col>
          {usersList.length > 0 ? (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">email</th>
                  <th className="text-center">Birthday</th>
                  <th className="text-center">Address</th>
                  <th className="text-center">Function</th>
                  <th className="text-center">Confirmed</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(res => {
                  return (
                    <tr key={res.users_id}>
                      <td>{`${res.last_name}, ${res.first_name} ${res.middle_name}`}</td>
                      <td>{res.email}</td>
                      <td>{dateFormatting(res.birthday)}</td>
                      <td>{res.address}</td>
                      <td className="text-center">{res.user_level_name}</td>
                      <td
                        className={`text-center ${
                          res.is_confirmed === 1 ? 'text-success' : 'text-error'
                        }`}>
                        {res.is_confirmed === 1 ? 'true' : 'false'}
                      </td>
                      <td className="text-center">
                        <OverlayTrigger
                          trigger="click"
                          placement="left"
                          overlay={
                            <Popover id="popover-basic">
                              <Popover.Body className="p-1">
                                <ListGroup variant="flush">
                                  <ListGroup.Item className="px-2 d-flex">
                                    <Link
                                      className="flex-grow-1 ms-1 text-decoration-none text-dark"
                                      to={`/users/manage/${res.users_id}`}>
                                      Edit
                                    </Link>
                                  </ListGroup.Item>
                                </ListGroup>
                              </Popover.Body>
                            </Popover>
                          }>
                          <i className="fas fa-ellipsis-v" />
                        </OverlayTrigger>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <h5 className="text-center">No Data</h5>
          )}
        </Col>
      </Row>
    </MainBody>
  );
};

const mapStateToProps = state => {
  return {
    usersList: state.usersList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUserList: () => dispatch(getAllUserList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
