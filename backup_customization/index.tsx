import {customize} from 'customization-api';
import BottomBar from './components/BottomBar';
import {AppRoot} from './components/AppRoot';
import CanvasView from './components/CanvasView';
import ParticipantPanel from './components/ParticipantPanel';

const userCustomization = customize({
  components: {
    appRoot: AppRoot,
    videoCall: {
      customContent: {
        canvas: CanvasView,
      },
      bottomBar: BottomBar,
      participantsPanel: ParticipantPanel,
    },
  },
});

export default userCustomization;
