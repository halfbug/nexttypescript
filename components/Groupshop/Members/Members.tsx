/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button, ListGroup, OverlayTrigger, Popover,
} from 'react-bootstrap';
import styles from 'styles/Groupshop.module.scss';
import { ref } from 'yup';

interface MembersProps {
  name : string;
}

const Members = ({
  name,
}: MembersProps) => (

  <>
    {['👑 Elisa C.', 'Neil D.', 'Paul B.', 'Maddy S.'].map((member) => (
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
              <h4>{member}</h4>
              <p>👑 GROUPSHOP OWNER</p>
              <p>$83 in discounts and cashback.</p>
            </Popover.Body>
          </Popover>
      )}
      >
        <Button variant="outline" className={styles.groupshop__top_item}>
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
