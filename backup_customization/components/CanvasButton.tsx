import React, {useContext, useEffect, useRef} from 'react';
import {
  UiKitBtnTemplate,
  customEvents,
  useRtc,
  useRender,
  useLayout,
} from 'customization-api';
import {AppRootContext} from './AppRoot';

export const CanvasButton = () => {
  const {canvasActive, activateCanvas} = useContext(AppRootContext);
  const {dispatch} = useRtc();
  const {renderList} = useRender();
  const {setLayout} = useLayout();


  const handlePress = (triggeredByEvent: boolean, action: boolean) => {
    console.log(
      'Customization: canvas',
      triggeredByEvent && 'event',
      action ? 'starting' : 'stopping',
    );
    if (action) {
      !triggeredByEvent && customEvents.send('canvas', '1', 2);
      dispatch({type: 'AddCustomContent', value: [333, {type: 'canvas'}]});
      dispatch({type: 'SwapVideo', value: [333]});
      setLayout('pinned');
    } else {
      !triggeredByEvent && customEvents.send('canvas', '0', 2);
      dispatch({type: 'UserOffline', value: [333, 'Canvas disabled']});
    }
    activateCanvas(action);
  };

  useEffect(() => {
    customEvents.on('canvas', (e) => {
      handlePress(true, e.payload === '1' ? true : false);
    });
    return () => {
      customEvents.off('canvas');
    };
  }, []);

  return (
    <div>
      <UiKitBtnTemplate
        btnText="Canvas"
        color={!canvasActive ? $config.PRIMARY_COLOR : 'red'}
        name={!canvasActive ? 'screenshareIcon' : 'screenshareOffIcon'}
        style={{
          height: 40,
          width: 40,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => handlePress(false, !canvasActive)}
      />
    </div>
  );
};
