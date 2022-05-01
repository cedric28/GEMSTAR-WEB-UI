import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import logo from "../../../../../assets/LandingPageImages/logo.png";
import LabelAndText from "../../../../UI/LabelAndText";
import "./index.css";

const RightForms = () => {
  // <Col md={8} xs={12}>
  return (
    <Col>
      <div className="d-flex flex-row">
        <div className="ms-5">
          <img className="h-100 w-75" src={logo} alt="logo" />
        </div>
        <div className="text-center">
          <h5 className="mb-0 mt-2">GEMSTAR ENGINEERING SERVICES</h5>
          <p className="mb-1">
            MACHINE SHOP | METAL FABRICATION | ENGINE REBUILDER | AUTO SHOP
          </p>
          <p className="mb-1">
            C. Morales Bldg., Nat'l Hi-way, Canlalay, Biñan City, Laguna
          </p>
          <p className="mb-1">Contact No.: +63 927 850 3420</p>
          <p className="mb-1">gemstar.machineshop@gmail.com</p>
        </div>
      </div>

      <Row className="mt-2 px-4">
        <Form.Group as={Col} controlId="formGridCustomer">
          <h5>RECEIPT</h5>
        </Form.Group>

        <Col>
          <LabelAndText className="mb-2" label="No.: " />

          <LabelAndText className="mb-2" label="Date: " />
        </Col>
      </Row>

      <LabelAndText className=" mt-2" label="Received from: " />

      <LabelAndText className="" label="Address: " />

      <Row>
        <Col>
          <LabelAndText className="" label="engaged in business style " />
        </Col>
        <Col>
          <LabelAndText className="" label="TIN: " />
        </Col>
      </Row>

      <LabelAndText className="" label="the amount of " />

      <Form.Group className="d-flex" as={Col} controlId="formGridCompany">
        <Form.Control
          className="flex-grow-1 border-0 border-bottom"
          type="text"
        />
        <Form.Label className="text-nowrap m-0 align-self-center">
          {" "}
          (P)
        </Form.Label>
        <Form.Control
          className="flex-grow-1 border-0 border-bottom"
          type="text"
        />
      </Form.Group>

      <LabelAndText className="mb-1" label="In partial/full payment of " />

      <Row className="mt-3">
        <Col>
          <table>
            <tr>
              <td colSpan="2">Sr. Citizen TIN</td>
            </tr>
            <tr>
              <td>OSCA/PWD ID No.</td>
              <td>Signature</td>
            </tr>
          </table>
        </Col>
        <Col>
          <Form.Group controlId="formGridCompany">
            <LabelAndText className="mb-1 px-4" label="By: " />
          </Form.Group>
          <p className="text-center">Authorized Representative</p>
        </Col>
      </Row>
    </Col>
  );
};
export default RightForms;
