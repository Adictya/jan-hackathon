import React from 'react';
import {ControlsComponentsArray} from 'customization-api';
import {CanvasButton} from './CanvasButton';

export default function BottomBar() {
  const componentArray = ControlsComponentsArray.map((E) => (
    <div>
      <E showControls={false} />
    </div>
  ));
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flex: 1,
      }}>
      {componentArray.slice(0, 2)}
      <CanvasButton />
      {componentArray.slice(3, 6)}
    </div>
  );
}
