/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button, ListGroup, OverlayTrigger, Popover,
} from 'react-bootstrap';
import styles from 'styles/Groupshop.module.scss';
import { ref } from 'yup';
import CrossICon from 'assets/images/cross.svg';

interface MembersProps {
  names : string[];
  cashback : string[];
}

const Members = ({
  names, cashback,
}: MembersProps) => (

  <>
    {names?.map((member, index) => (
      <OverlayTrigger
        trigger="click"
        rootClose
        key={member}
        placement="bottom"
        // delay={200}
        // flip
        overlay={(
          <Popover id={`popover-positioned-${member}`} arrowProps={() => {}}>
            {/* <Popover.Header as="h3">{`Popover ${member}`}</Popover.Header> */}
            <Popover.Body>
              <div className={['d-flex justify-content-end mb-1 ', styles.groupshop__popover_cross].join('')}>
                <CrossICon />
              </div>
              <h4>

                {member}
                {index}
              </h4>
              <p className="mb-2">
                {index === 0 ? '👑GROUPSHOP OWNER' : 'GROUPSHOP MEMBER'}
                {' '}
              </p>
              <p>
                {cashback[index]}
                {' '}
                in discounts and cashback.
              </p>
            </Popover.Body>
          </Popover>
      )}
      >
        <Button variant="light" className={`${index === 0 ? styles.groupshop__top_item_owner : styles.groupshop__top_item}`}>
          {index === 0 && '👑'}
          {' '}
          {member}
          .
        </Button>
      </OverlayTrigger>
    ))}
  </>
);

// Members.defaultProps = {
//   user: {},
// };

export default Members;
