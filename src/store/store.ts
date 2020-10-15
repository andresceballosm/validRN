import { createStore, applyMiddleware } from 'redux';
import { Reducers } from './reducers/rootReducers';
import createSagasMiddleware from 'redux-saga';
import rootSaga from './sagas/sagas';

const sagaMiddleware = createSagasMiddleware()
const store = createStore(Reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
