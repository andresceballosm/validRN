  
export const actionIds = {
    GET_TOP_ARTISTS:
      '[0] Request a API FM Top Artists.',
    GET_TOP_TRACKS:
      '[1] Request a API FM Top Tracks',
    SET_LOADING: '[3] Start spinner to loading status',
    STOP_LOADING: '[4] Stop spinner to loading status',
    SHOW_ALERT: '[5] Show Modal Alert',
    HIDE_ALERT: '[6] Hide Modal Alert',
    SET_TOP_ARTISTS:'[7] Set Top Artists to the store.',
    SET_TOP_TRACKS:'[8] Set Top tracks to the store.',
    CLEAR_TOP_ARTISTS:'[9] clear Top Artists to the store.',
    CLEAR_TOP_TRACKS:'[10] clear Top tracks to the store.',
  };
  
  export interface BaseAction {
    type: string;
    payload?;
  }