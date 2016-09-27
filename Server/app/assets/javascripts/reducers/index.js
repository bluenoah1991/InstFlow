import {combineReducers} from 'redux';

import ProfileReducer from './ProfileReducer';

const reducers = combineReducers({
    profile: ProfileReducer
});

export default reducers;