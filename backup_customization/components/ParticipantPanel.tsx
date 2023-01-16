import React, {useContext} from 'react';
import {useRender} from 'customization-api';
import {View} from 'react-native';
import {AppRootContext} from './AppRoot';

const ParticipantPanel = (props: {}) => {
  const {renderList, activeUids} = useRender();
  const {order} = useContext(AppRootContext);
  return (
    <View
      style={{
        flex: 1,
        width: '20%',
        maxWidth: '300px',
        minWidth: '200px',
      }}>
      {activeUids.map((e, i) => {
        const user = renderList[e];
        return (
          <View>
            {order && order[user.uid] && order[user.uid] + ' '}
            {user.name}
            {user.uid}
          </View>
        );
      })}
    </View>
  );
};

export default ParticipantPanel;
