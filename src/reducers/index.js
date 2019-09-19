import { locReducer } from './location';
import { catReducer } from './category';
import { combineReducers } from 'redux';
import { display } from './display';

const rootReducer = combineReducers({
    locations: locReducer,
    categories: catReducer,
    display: display
});

export default rootReducer;
