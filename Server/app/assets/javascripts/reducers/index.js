import {combineReducers} from 'redux';

import ToastReducer from './ToastReducer';
import ModalReducer from './ModalReducer';
import ProfileReducer from './ProfileReducer';
import PasswordReducer from './PasswordReducer';
import BotsReducer from './BotsReducer';
import BotReducer from './BotReducer';
import UserReducer from './UserReducer';
import HyperlinkMessageReducer from './HyperlinkMessageReducer';
import SendingTaskReducer from './SendingTaskReducer';
import DashboardReducer from './DashboardReducer';
import FeedbackReducer from './FeedbackReducer';

const reducers = combineReducers({
    toast: ToastReducer,
    modal: ModalReducer,
    profile: ProfileReducer,
    password: PasswordReducer,
    bots: BotsReducer,
    bot: BotReducer,
    user: UserReducer,
    hyperlinkMessage: HyperlinkMessageReducer,
    sendingTask: SendingTaskReducer,
    dashboard: DashboardReducer,
    feedback: FeedbackReducer
});

export default reducers;