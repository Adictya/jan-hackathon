import React, {useRef, useEffect, useContext} from 'react';
import {customEvents, useLocalUid, useIsHost} from 'customization-api';
import {AppRootContext} from './AppRoot';

const colorStore = ['blue', 'green', 'blue', 'aqua', 'red', 'pink', 'yellow'];

function drawCircle(x, y, color, context) {
  context.beginPath();
  context.arc(x, y, 9, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

function clearRect(context: CanvasRenderingContext2D) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

export const CanvasView = (props: {}) => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const localUid = useLocalUid();

  const cursorPos = useRef({[localUid]: [0, 0]});

  const {setOrder} = useContext(AppRootContext);

  useEffect(() => {
    const listener = (e) => {
      const [x, y] = e.payload.split(',');
      cursorPos.current[e.sender] = [parseFloat(x), parseFloat(y)];
    };
    customEvents.on('mousePos', listener);

    return () => {
      customEvents.off('mousePos', listener);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current && cursorPos.current[localUid]) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      var interval = setInterval(() => {
        clearRect(context);
        Object.keys(cursorPos.current).forEach((e, i) => {
          const [x, y] = cursorPos.current[e];
          drawCircle(x, y, colorStore[i % 7], context);
        });
      }, 17);
      var interval2 = setInterval(() => {
        const [x, y] = cursorPos.current[localUid];
        customEvents.send('mousePos', `${x},${y}`);
      }, 100);
    }

    return () => {
      interval && clearInterval(interval);
      interval2 && clearInterval(interval2);
    };
  }, [canvasRef, cursorPos]);

  function getMousePos(evt, canvas) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y

    // console.log('Mouse positions', {
    //   x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
    //   y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    // });

    return {
      x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    };
  }

  return (
    <div style={{flex: 1}}>
      <button
        style={{position: 'absolute', right: 0}}
        onClick={() => {
          const tempObject = {};
          Object.keys(cursorPos.current).forEach((e, i) => {
            tempObject[e] = i;
          });
          setOrder(tempObject);
          customEvents.send('order', JSON.stringify(tempObject));
        }}>
        Set Order
      </button>
      <canvas
        onMouseMove={(e) => {
          const pos = getMousePos(e, canvasRef.current);
          cursorPos.current[localUid] = [pos.x, pos.y];
          console.log(cursorPos.current);
        }}
        ref={canvasRef}
        style={{height: '100%', width: '100%'}}
      />
    </div>
  );
};

export default CanvasView;
