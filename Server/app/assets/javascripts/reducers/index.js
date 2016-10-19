import {combineReducers} from 'redux';

import ToastReducer from './ToastReducer';
import ModalReducer from './ModalReducer';
import ProfileReducer from './ProfileReducer';
import BotReducer from './BotReducer';
import UserReducer from './UserReducer';

const reducers = combineReducers({
    modal: ModalReducer,
    toast: ToastReducer,
    profile: ProfileReducer,
    bot: BotReducer,
    user: UserReducer
});

export default reducers;