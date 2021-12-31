import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import styles from 'styles/ToggleButton.module.scss';

function ToggleButton() {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={styles.toggle_switch}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={styles.switch} />
    </label>
  );
}
export default ToggleButton;