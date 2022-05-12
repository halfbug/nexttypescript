/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Button, ListGroup, OverlayTrigger, Placeholder, Popover, Row,
} from 'react-bootstrap';
import styles from 'styles/Groupshop.module.scss';
import { ref } from 'yup';
import CrossICon from 'assets/images/cross.svg';
import { RootProps } from 'types/store';

interface MembersProps extends RootProps{
  names : string[];
  cashback : string[];
}

const Members = ({
  names, cashback, pending,
}: MembersProps) => {
  const [show, setShow] = useState(false);
  const handleCloseBtn = () => {
    setShow(!show);
  };

  if (pending) {
    return (
      <>
        <Placeholder.Button as="p" className="border-0 m-1 placeholder-glow bg-light" />
        <Placeholder.Button as="p" className="border-0 m-1 placeholder-glow bg-light" />
      </>
    );
  }
  return (
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
                <div
                  className={['d-flex justify-content-end mb-1 ',
                    styles.groupshop__popover_cross].join('')}
                >
                  <CrossICon onClick={handleCloseBtn} />
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
          <Button variant="light" className={styles.groupshop__top_item}>
            {index === 0 && '👑'}
            {' '}
            {member}
            .
          </Button>
        </OverlayTrigger>
      ))}
    </>
  );
};

// Members.defaultProps = {
//   user: {},
// };

export default Members;
