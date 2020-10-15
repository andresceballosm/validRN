import { call, takeEvery, put } from 'redux-saga/effects';
import { stopLoading, setLoading, showAlert } from '../actions/appActions';
import { GET } from '../api';
import config from '../../config/config-fm';
import { actionIds } from '../common';
import { setTopTracks, setTopArtists } from '../actions/fmActions';

const topArtists = async (values:any) =>
    await GET(`/2.0/?method=geo.gettopartists&country=${values.country}&limit=${values.limit}&page=${values.page}&api_key=${config.FM.APIKey}&format=json`, {    
        baseUrl: `${config.FM.baseURL}`,
        headers: {
            'Content-Type': 'application/json',
            'xForm': 'application/x-www-form-urlencoded',
            'formData': 'multipart/form-data'
        }  
    })
    .then(response => response)
    .catch(error => error.response);

const topTracksCall = async (values:any) =>
    await GET(`/2.0/?method=geo.gettoptracks&country=${values.country}&limit=${values.limit}&page=${values.page}&api_key=${config.FM.APIKey}&format=json`, {
        baseUrl: `${config.FM.baseURL}`,
        headers: {
            'Content-Type': 'application/json',
            'xForm': 'application/x-www-form-urlencoded',
            'formData': 'multipart/form-data'
        }  
    })
    .then(response => response)
    .catch(error => error.response);


function* TopArtist(values : any) {
    try {
        yield put(setLoading());
        let request = yield call(topArtists, values.payload);
        if(request.data.error){
            yield(put(showAlert({ 
                type : 'info', 
                msg : request.data.message
            })));
        }
        if(request.status === 200){
            yield put(setTopArtists(request.data.topartists.artist))
        }
        yield put(stopLoading());
    } catch (error) {
        yield put(stopLoading());
    }
};


function* TopTracks(values : any) {
    try {
        yield put(setLoading());
        let request = yield call(topTracksCall, values.payload);
        if(request.data.error){
            yield(put(showAlert({ 
                type : 'info', 
                msg : request.data.message
            })));
        }

        if(request.status === 200){
            yield put(setTopTracks(request.data.tracks.track))
        }
        yield put(stopLoading());
    } catch (error) {
        yield put(stopLoading());
    }
}


export const sagaFM = [
    //take every listening to the dispatch
    takeEvery(actionIds.GET_TOP_ARTISTS, TopArtist),
    takeEvery(actionIds.GET_TOP_TRACKS, TopTracks),
];