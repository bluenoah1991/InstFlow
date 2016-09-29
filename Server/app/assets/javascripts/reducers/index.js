import {combineReducers} from 'redux';

import ToastReducer from './ToastReducer';
import ProfileReducer from './ProfileReducer';

const reducers = combineReducers({
    toast: ToastReducer,
    profile: ProfileReducer
});

export default reducers;