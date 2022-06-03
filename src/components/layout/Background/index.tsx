import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Ovals from './Ovals';
import classes from './Background.module.scss';

const Background: React.FC<{ hasOvals?: boolean }> = ({ hasOvals = false }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        <div className={classes.root}>
          {hasOvals && <Ovals />}
          <div className={classes['pink-circle-left']} />
          <div className={classes['blue-circle-left']} />
          <div className={classes['light-blue-rect-left']} />
          <div className={classes['green-polygon-left']} />

          <div className={classes['pink-circle-right']} />
          <div className={classes['blue-circle-right']} />
          <div className={classes['light-blue-rect-right']} />
          <div className={classes['green-polygon-right']} />
        </div>,
        document.querySelector('#appBackground')!
      )
    : null;
};
export default Background;
