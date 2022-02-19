import { combineReducers } from 'redux';
/* IMPORT REDUCERS */
import exampleReducer from './exampleReducer';

export default combineReducers({
    exampleStore: exampleReducer,
});