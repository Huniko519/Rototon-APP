import React from 'react';

const CircleMark = (props) => {
  const styleMark = {
    width: props.width ?? 32,
    height: props.height ?? 32,
    borderRadius: props.radius ?? '50%',
    borderColor: props.borderColor,
    borderWidth: props.borderWidth,
    borderStyle: props.borderStyle ?? 'none',
    backgroundColor: props.bgColor,
    cursor: props.linkable ? 'pointer' : 'unset',
  };

  return (
    <div className={props.className} onClick={props.onClick}>
      <div style={styleMark} className="d-flex align-items-center justify-content-center">
        {props.children}
      </div>
    </div>
  );
};

export default CircleMark;