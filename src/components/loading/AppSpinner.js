import React from 'react';
import styles from './AppSpiner.module.css';

const AppSpinner = (props) => {
  return (
    <div className={`${props.absolute ? styles.absolute : "text-center"}`}>
      <div className={`${styles.spinner} spinner-border color-primary`} role="status">
        <span className="sr-only" />
      </div>
    </div>
  );
};

export default AppSpinner;