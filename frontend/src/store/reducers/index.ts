import { combineReducers } from 'redux';
import departmentReducer from './departmentReducer';
import processReducer from './processReducer';
import alertReducer from './alertReducer';

const rootReducer = combineReducers({
  department: departmentReducer,
  process: processReducer,
  alert: alertReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
