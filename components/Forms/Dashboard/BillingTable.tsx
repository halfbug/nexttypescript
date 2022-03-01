/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Billing.module.scss';
import {
  Row, Col, Form, Table,
} from 'react-bootstrap';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';

// export interface BillingTableProps {
//   values: any;
//   errors: any;
//   touched: any;
//   handleChange: any;
//   handleForm: any;
//   setFieldValue?: any;
// }

export default function BillingTable() {
  return (
    <section className={styles.billing}>
      <Row className="">
        <Col>
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col className="text-end mx-5"><WhiteButton>Load more</WhiteButton></Col>
      </Row>
    </section>
  );
}
