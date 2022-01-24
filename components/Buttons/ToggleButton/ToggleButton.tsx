import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import styles from 'styles/ToggleButton.module.scss';

interface IToggleProps {
  handleToggle() : any;
  isActive: boolean;
}
function ToggleButton({ handleToggle, isActive }: IToggleProps) {
  const [isToggled, setIsToggled] = useState(false);
  useEffect(() => {
    setIsToggled(isActive);
  }, []);

  const onToggle = () => {
    setIsToggled(!isToggled);
    handleToggle();
  };

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.toggle_switch}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={styles.switch} />
    </label>
  );
}
// ToggleButton.defaultProps = {
//   handleToggle: null,
// };

export default ToggleButton;
