import {combineReducers} from 'redux';

import ToastReducer from './ToastReducer';
import ProfileReducer from './ProfileReducer';
import BotReducer from './BotReducer';

const reducers = combineReducers({
    toast: ToastReducer,
    profile: ProfileReducer,
    bot: BotReducer
});

export default reducers;