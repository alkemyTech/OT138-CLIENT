import { combineReducers } from 'redux';
/* IMPORT REDUCERS */
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer
});