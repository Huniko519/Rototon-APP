import React, { useEffect, useState } from 'react';

const BookMark = (props) => {
  const { width, height, color, bgColor, value} = props;
  const [top, setTop] = useState(15);
  const defaultHalf = 30;

  useEffect(() => {
    if (width && height) {
      setTop((height - width/ 2) / 2 - 5);
    } else if (height) {
      setTop((height - defaultHalf) / 2 - 5);
    } else if (width) {
      setTop((70 - width / 2) / 2 - 5);
    }
  }, [width, height]);

  const styleMark = {
    width: props.width ?? 60,
    height: props.height ?? 75,
    padding: 0,
    borderLeftWidth: width? width/2 : 30,
    borderRightWidth: width? width/2 : 30,
    borderBottomWidth: width? width/2 : 30,
    borderLeftColor: bgColor ?? 'red',
    borderRightColor: bgColor ?? 'red',
    borderBottomColor: 'transparent',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
  }

  return (
    <div style={{position: 'relative'}}>
      <div style={styleMark} />
      {props.value &&
      <span className={`fw-500 fs-0p75 text-center w-100`}
        style={{
        color: color ?? 'white', 
        position: 'absolute',
        top: top,
        }}
      >
        ${value}
      </span>
      }
    </div>
  );
};

export default BookMark;