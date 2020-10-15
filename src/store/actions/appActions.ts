import { BaseAction, actionIds } from "../common";
import { IAlert } from '../interfaces';

export const setLoading = (): BaseAction => ({
    type: actionIds.SET_LOADING,
    payload: true,
});

export const stopLoading = (): BaseAction => ({
    type: actionIds.STOP_LOADING,
    payload: false,
});

export const showAlert = (
    data: IAlert
): BaseAction => {
    return {
        type: actionIds.SHOW_ALERT,
        payload: data
    }
};

export const hideAlert = (): BaseAction => ({
    type: actionIds.HIDE_ALERT,
    payload: null,
});