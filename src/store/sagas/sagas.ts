import { all, fork } from 'redux-saga/effects'
import { sagaFM } from './sagaFM'

export default function* rootSaga() {    
    yield all([
        ...sagaFM,
    ])
};