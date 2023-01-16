import React, {useEffect, useState} from 'react';
import {customEvents, useRtc} from 'customization-api';

export interface AppRootInterface {
  canvasActive?: boolean;
  activateCanvas: (p) => void;
  setOrder: (p: any) => void;
  order?: any;
}

export const AppRootContext = React.createContext<AppRootInterface>({
  canvasActive: false,
  activateCanvas: () => {},
  setOrder: (p: any) => {},
});

interface AppRootProviderProps {
  children: React.ReactNode;
}

export const AppRoot = (props: AppRootProviderProps) => {
  const [customState, setCustomState] = useState(false);

  const [order, setOrder] = useState();

  const setOrder2 = (p: any) => {
    setOrder(p);
  };

  const activateCanvas = (p) => {
    setCustomState(p);
  };
  useEffect(() => {
    const listener = (e) => {
      console.log('Customization: Starting canvas', e);
      activateCanvas(true);
    };

    const listener2 = (e) => {
      setOrder(JSON.parse(e.payload));
    };
    customEvents.on('canvas', listener);
    customEvents.on('order', listener2);
    return () => {
      customEvents.off('canvas');
    };
  }, []);
  return (
    <AppRootContext.Provider
      value={{
        canvasActive: customState,
        activateCanvas,
        setOrder: setOrder2,
        order,
      }}>
      {props.children}
    </AppRootContext.Provider>
  );
};
