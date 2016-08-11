import { combineReducers } from 'redux';

import todos from './todoReducers';

export default combineReducers({
	todos,
});