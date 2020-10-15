import { BaseAction, actionIds } from "../common";
import { IArtist, ITrack, IRGetTopArtist, IRGetTopTracks } from '../interfaces';

export const getTopArtists = (
    data: IRGetTopArtist
): BaseAction => ({
    type: actionIds.GET_TOP_ARTISTS,
    payload: data,
});

export const setTopArtists = (
    data: IArtist[]
): BaseAction => ({
    type: actionIds.SET_TOP_ARTISTS,
    payload: data,
});


export const getTopTracks = (
    data: IRGetTopTracks
): BaseAction => ({
    type: actionIds.GET_TOP_TRACKS,
    payload: data,
});

export const setTopTracks = (
    data: ITrack[]
): BaseAction => ({
    type: actionIds.SET_TOP_TRACKS,
    payload: data,
});

export const clearArtists = () : BaseAction => ({
    type: actionIds.CLEAR_TOP_ARTISTS
})

export const clearTracks = () : BaseAction => ({
    type: actionIds.CLEAR_TOP_TRACKS
})
