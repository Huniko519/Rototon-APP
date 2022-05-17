import React from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import styles from './HeartMark.module.css';

const HeartMark = (props) => {
  return (
    <div className={`${props.className} ${styles.heartCircle}`} onClick={props.onClick}>
      <BsHeartFill className={`${styles.heartIcon} ${props.checked ? styles.heartNormal : styles.heartHover}`} />
      <BsHeart className={`${styles.heartIcon} ${props.checked ? styles.heartHover : styles.heartNormal}`} />
    </div>
  );
};

export default HeartMark;