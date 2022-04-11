/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button, ListGroup, OverlayTrigger, Popover,
} from 'react-bootstrap';
import styles from 'styles/Groupshop.module.scss';
import { ref } from 'yup';

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
              <h4>

                {member}
                {index}
              </h4>
              <p>
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
        <Button variant="light" className={styles.groupshop__top_item}>
          {index === 0 && '👑'}
          {' '}
          {member}
        </Button>
      </OverlayTrigger>
    ))}
  </>
);

// Members.defaultProps = {
//   user: {},
// };

export default Members;
