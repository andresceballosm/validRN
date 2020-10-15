import { actionIds } from '../common';
import { clearArtists, clearTracks, setTopArtists, setTopTracks } from '../actions/fmActions';
import { IArtist, ITrack } from '../interfaces';
import { storeDataObject } from '../common/AsyncStorage';

type FMState = {
  tracks : IArtist[];
  artists : ITrack[];
};

const initialState: FMState = { 
  tracks: [],
  artists : []
};

type FMAction = ReturnType<
  typeof setTopArtists | 
  typeof clearArtists | 
  typeof clearTracks | 
  typeof setTopTracks>;

//Reducer
export function fmReducer(
  state = initialState,
  action: FMAction
): FMState {
  switch (action.type) {
      case actionIds.SET_TOP_ARTISTS:
        //Save the last data to show when there isn't connection
        storeDataObject('artists', action.payload)
        return { 
          ...state, 
          artists : [ ...state.artists, ...action.payload ]
        };
      case actionIds.SET_TOP_TRACKS:
        //Save the last data to show when there isn't connection
        storeDataObject('tracks', action.payload)
        return { 
          ...state, 
          tracks : [ ...state.tracks, ...action.payload ]
        };
      case actionIds.CLEAR_TOP_TRACKS:
        return { 
          ...state, 
          tracks : []
        };
      case actionIds.CLEAR_TOP_ARTISTS:
        return { 
          ...state, 
          artists : []
        };
      default:
        return state;
  }
}