import {combineReducers} from 'redux';

import ToastReducer from './ToastReducer';
import ProfileReducer from './ProfileReducer';
import ApplicationReducer from './ApplicationReducer';

const reducers = combineReducers({
    toast: ToastReducer,
    profile: ProfileReducer,
    application: ApplicationReducer
});

export default reducers;