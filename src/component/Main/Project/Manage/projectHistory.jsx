import React, { Fragment, useState } from "react";
import {
  Timeline,
  Container,
  YearContent,
  BodyContent,
  Section,
  Description,
} from "vertical-timeline-component-react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import RichTextBox from "../../../UI/RichTextBox";

const customTheme = {
  yearColor: "#405b73",
  lineColor: "#d0cdc4",
  dotColor: "#262626",
  borderDotColor: "#d0cdc4",
  titleColor: "#405b73",
  subtitleColor: "#bf9765",
  textColor: "#262626",
};

const ProjectHistory = (props) => {
  const { user_level_acc, createProjectStatus, projectId } = props;
  const [values, setValues] = useState({
    statusId: 3,
    remarks: "",
  });

  console.log({ values });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProjectStatus(projectId, values.statusId, values.remarks);
    // createProjectComment({
    //   projectId,
    //   comment_content: values.comment_content.replace(
    //     /<p>/g,
    //     `<p class="mb-0">`
    //   ),
    // }).then((ret) => {
    //   setValues({ ...values, comment_content: "" });
    // });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setValues({ ...values, statusId: value });
  };

  return (
    <Fragment>
      {user_level_acc === "emp" && (
        <Fragment>
          <Card.Title className="mt-4 px-2 pb-2 border-bottom">
            Employee Assignment
          </Card.Title>
          <Row className="mx-2">
            <Col>
              <Form.Group
                as={Col}
                className="mb-2"
                controlId="formBasicFirstName"
              >
                <Form.Label className="mb-0">Add Employee: </Form.Label>
                <Form.Select
                  defaultValue={values.statusId}
                  onChange={handleSelectChange}
                  required
                >
                  <option value="3">In Progress</option>
                  <option value="4">Done</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mx-2">
            <Col>
              <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="my-2" controlId="formBasicPassword">
                  <RichTextBox
                    name="remarks"
                    values={values}
                    setValues={setValues}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  <i className="fas fa-paper-plane" />
                </Button>
              </Form>
            </Col>
          </Row>
        </Fragment>
      )}

      <Row className="mx-2">
        <Col>
          <Timeline theme={customTheme} dateFormat="only-number">
            <Container>
              <YearContent startDate="2020/07/01" />
              <BodyContent>
                <Section title="Title">
                  <Description text="Description" />
                  <Description text="Another description" />
                </Section>
              </BodyContent>
            </Container>

            <Container>
              <YearContent startDate={Date.now()} />
              <BodyContent>
                <Section title="Title">
                  <Description text="Description" />
                  <Description text="Another description" />
                </Section>
              </BodyContent>
            </Container>
          </Timeline>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectHistory;
