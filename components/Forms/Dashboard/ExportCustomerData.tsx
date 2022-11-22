/* eslint-disable jsx-quotes */
import * as React from 'react';
import styles from 'styles/Retail.module.scss';
import {
  Row, Col, Dropdown,
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ToolTip from 'components/Buttons/ToolTip/ToolTip';
import WhiteButton from 'components/Buttons/WhiteButton/WhiteButton';
import DropdownArrow from 'assets/images/dropdown-arrow.svg';
import FilterIcon from 'assets/images/filter-icon.svg';
import { InfoCircle } from 'react-bootstrap-icons';

const changeDate = (value:any, field:any) => {
  console.log('date change');
};

const ExportCustomerData = () => (
  <>
    <Row>
      <Col lg={12}>
        <div className={styles.retail__exportCustomerData}>
          <h4 className={styles.retail__exportCustomerData__heading}>
            Export Customer Data
          </h4>
          <span className={styles.retail__exportCustomerData__text}>
            Export data for newly activated customers below.
          </span>
          <div className="mt-4">
            <h4>
              Filter by date range:
            </h4>
            <Row>
              <Col lg={6}>
                <div className='d-flex align-items-center'>
                  <span className={styles.retail__exportCustomerData__label}>
                    Start Date
                  </span>
                  <ToolTip
                    className={styles.retail__exportCustomerData__tooltip}
                    popoverClassName={styles.retail__exportCustomerData__tooltip__popover}
                    icon={<InfoCircle size={13} />}
                    popContent="You can’t select orders older than one year old."
                  />
                </div>
                <div>
                  <DatePicker
                    className="form-control"
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                    name="startDate"
                    maxDate={new Date()}
                                    //   selected={startDate}
                    onChange={(sdate:any) => changeDate(sdate, 'start')}
                                    //   icon={<FiCalendar />}
                    calendarClassName="calendarArrow"
                  />
                </div>
              </Col>
              <Col lg={6} className="">
                <div className='d-flex align-items-center'>
                  <span className={styles.retail__exportCustomerData__label}>
                    End Date
                  </span>
                </div>
                <div>
                  <DatePicker
                    className="form-control"
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                                    //   minDate={startDate}
                    maxDate={new Date()}
                    name="endtDate"
                                    //   selected={endDate}
                    onChange={(edate:any) => changeDate(edate, 'end')}
                    calendarClassName="calendarArrow"
                  />
                </div>
              </Col>
            </Row>
            <div className="mt-2">
              <WhiteButton>
                Clear dates
              </WhiteButton>
            </div>
          </div>
          <Row>
            <Col lg={12}>
              <div className="d-flex align-items-center my-4">
                <div className={styles.retail__exportCustomerData__heading}>
                  Filter by channel:
                </div>
                <div>
                  <Dropdown className="d-inline mx-2" align={{ lg: 'start', sm: 'end' }}>
                    <Dropdown.Toggle
                      id="dropdown-autoclose-true"
                      variant="outline-primary"
                      className={styles.retail__exportCustomerData_dropdown}
                    >
                      <FilterIcon />
                      <span className='ps-2 pe-3'>
                        Whole Foods
                      </span>
                      <DropdownArrow />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={styles.retail__exportCustomerData_dropdownMenu}>
                      <div>
                        <Dropdown.Item>
                          Whole Foods
                        </Dropdown.Item>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Col>
            <Col lg={12}>
              <div className="d-flex">
                <div className="pe-2">
                  <WhiteButton>
                    Export with filters
                  </WhiteButton>
                </div>
                <div>
                  <WhiteButton>
                    Export All
                  </WhiteButton>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  </>
);

export default ExportCustomerData;
