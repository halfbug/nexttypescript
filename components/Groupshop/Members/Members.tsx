import React, { useState } from 'react';
import {
  Button, Placeholder, Popover, Overlay,
} from 'react-bootstrap';
import styles from 'styles/Groupshop.module.scss';
import CrossICon from 'assets/images/cross.svg';
import { useMediaQuery } from 'react-responsive';
import { RootProps } from 'types/store';

interface MembersProps extends RootProps{
  names : string[];
  cashback : string[];
}

const Members = ({
  names, cashback, pending,
}: MembersProps) => {
  const [show, setShow] = useState<any>({});
  const [target, setTarget] = useState(null);

  const handleClick = (event: any, state: string) => {
    setShow({ [state]: true });
    setTarget(event.target);
  };
  const handleClose = (event: any, state: string) => {
    setShow({ [state]: false });
  };

  const isLargeScreen = useMediaQuery({
    query: '(min-width: 476px)',
  });

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

      {names?.map((member, idx) => (
        <>
          <div>
            <Button onClick={(e) => handleClick(e, `m-${idx}`)} variant="light" className={styles.groupshop__top_item}>
              {idx === 0 && '👑'}
              {' '}
              {member}
            </Button>
            <Overlay
              rootClose
              show={show[`m-${idx}`] || false}
              target={target}
              placement={isLargeScreen ? 'bottom' : 'top'}
              onHide={() => setShow({ ...show, [`m-${idx}`]: false })}
            >
              <Popover id={`popover-positioned-${idx}`}>
                <Popover.Body>
                  <div
                    className={['d-flex justify-content-end mb-1 ',
                      styles.groupshop__popover_cross].join('')}
                  >
                    <CrossICon onClick={(e: any) => handleClose(e, `m-${idx}`)} />
                  </div>
                  <h4>
                    {member}
                  </h4>
                  <p className="mb-2">
                    {idx === 0 ? '👑GROUPSHOP OWNER' : 'GROUPSHOP MEMBER'}
                    {' '}
                  </p>
                  {/* <p>
                  {cashback[idx]}
                  {' '}
                  in discounts and cashback.
                </p> */}
                </Popover.Body>
              </Popover>
            </Overlay>
          </div>
          {(idx + 1) % 10 === 0 && (
          <div className={styles.groupshop__member_line_break} />
          )}
        </>
      ))}
    </>
  );
};

// Members.defaultProps = {
//   user: {},
// };

export default Members;