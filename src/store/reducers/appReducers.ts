import { actionIds } from '../common';
import { setLoading, stopLoading, showAlert, hideAlert } from '../actions/appActions';
import { IAlert } from '../interfaces';

type LoadingState = {
  loading : boolean;
  alert : IAlert
};

const initialState: LoadingState = { 
  loading : false,
  alert: null
};

type LoadingAction = ReturnType<
  typeof setLoading | 
  typeof stopLoading | 
  typeof showAlert | 
  typeof hideAlert>;

//Reducer
export function appReducer(
  state = initialState,
  action: LoadingAction
): LoadingState {
    switch (action.type) {
        case actionIds.SET_LOADING:
            return { ...state, loading : action.payload };
        case actionIds.STOP_LOADING:
            return { ...state, loading : initialState.loading };
        case actionIds.SHOW_ALERT:
            return { ...state, alert : action.payload };
        case actionIds.HIDE_ALERT:
            return { ...state, alert : action.payload };
        default:
            return state;
    }
}