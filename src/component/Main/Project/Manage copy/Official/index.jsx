import React, { useRef } from 'react';
import { Button, Row, Container, Modal } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import LeftTable from './LeftTable';
import RightForms from './RightForms';

const Official = props => {
  const { handleClose, show, projectQuotation, services, projectDetails } =
    props;
  const ref = useRef();

  const printDocument = () => {
    html2canvas(ref.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      var pdf = new jsPDF('p', 'mm', 'a4');

      const width = pdf.internal.pageSize.getWidth() - 20;
      const height = pdf.internal.pageSize.getHeight() - 10;

      pdf.addImage(imgData, 'PNG', 10, 5, width, height);
      pdf.save(`${projectDetails.project_name} OR.pdf`);
    });
  };

  return (
    <Modal show={show} size="xl" onHide={handleClose} keyboard={false}>
      <Modal.Body>
        <div ref={ref}>
          <Container>
            <Row>
              <RightForms />
            </Row>
            <Row>
              <p className="mt-4">
                <center>
                  THIS OFFICIAL RECEIPT SHALL BE VALID FOR FIVE (5) YEARS FROM
                  THE DATE OF ATP
                </center>
              </p>
            </Row>
          </Container>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={printDocument}>
          Generate PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Official;
