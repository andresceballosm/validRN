import * as actions from '../../../src/store/actions/fmActions';
import * as types from '../../../src/store/common'

describe('actions', () => {
  it('should create an action to get getTopArtists', () => {
        const payload = {
            country : 'spain',
            page: '1',
            limit:'20'
        };     
        const expectedAction = {
            type: types.actionIds.GET_TOP_ARTISTS,
            payload
        }
        expect(actions.getTopArtists(payload)).toEqual(expectedAction)
    });
    it('should create an action to get getTopTracks', () => {
        const payload = {
            country : 'spain',
            page: '1',
            limit:'20'
        };
        const expectedAction = {
            type: types.actionIds.GET_TOP_TRACKS,
            payload
        }
        expect(actions.getTopTracks(payload)).toEqual(expectedAction)
    })
})