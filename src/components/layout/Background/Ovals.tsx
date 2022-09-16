import { useWindowSize, useIsomorphicLayoutEffect } from 'usehooks-ts';
import classes from './Background.module.scss';

const Ovals = () => {
  const { width, height } = useWindowSize();

  useIsomorphicLayoutEffect(() => {
    const canvas = document.getElementsByTagName('canvas')[0].getContext('2d');
    const shiftStep = 5;
    const radiusStep = Math.round(
      Math.sqrt(Math.pow(width!, 2) + Math.pow(height!, 2)) / 30
    );
    canvas!.strokeStyle = 'rgba(255,255,255,1)';
    canvas!.lineWidth = 3;
    let ovalCount = 11;

    if (width! < 600) ovalCount = 8;
    for (let i = 0; i < ovalCount; i += 1) {
      canvas!.beginPath();
      canvas!.ellipse(
        i * shiftStep,
        i * shiftStep,
        50 + i * radiusStep,
        50 + i * radiusStep,
        0,
        0,
        2 * Math.PI
      );
      canvas!.stroke();
    }

    if (window.matchMedia('screen and (min-width: 768px)').matches) {
      for (let i = 0; i < 11; ++i) {
        canvas!.beginPath();
        canvas!.ellipse(
          width! - i * shiftStep,
          height! - i * shiftStep,
          50 + i * radiusStep,
          50 + i * radiusStep,
          0,
          0,
          2 * Math.PI
        );
        canvas!.stroke();
      }
    }
  }, [width, height]);

  return <canvas className={classes.canvas} width={width} height={height} />;
};

export default Ovals;
