import { combineReducers } from 'redux';
import { fmReducer } from './fmReducer';
import { appReducer } from './appReducers';

export const Reducers = combineReducers({
    app: appReducer,
    fm : fmReducer
});

export type RootState = ReturnType<typeof Reducers>;