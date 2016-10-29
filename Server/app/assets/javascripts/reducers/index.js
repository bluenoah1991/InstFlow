import {combineReducers} from 'redux';

import ToastReducer from './ToastReducer';
import ModalReducer from './ModalReducer';
import ProfileReducer from './ProfileReducer';
import PasswordReducer from './PasswordReducer';
import BotsReducer from './BotsReducer';
import BotReducer from './BotReducer';
import UserReducer from './UserReducer';
import HyperlinkMessageReducer from './HyperlinkMessageReducer';

const reducers = combineReducers({
    toast: ToastReducer,
    modal: ModalReducer,
    profile: ProfileReducer,
    password: PasswordReducer,
    bots: BotsReducer,
    bot: BotReducer,
    user: UserReducer,
    hyperlinkMessage: HyperlinkMessageReducer
});

export default reducers;