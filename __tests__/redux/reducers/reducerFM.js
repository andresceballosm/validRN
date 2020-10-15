import reducer from '../../../src/store/reducers/fmReducer';
import * as types from '../../../src/store/common';

describe('todos reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual([
            {
                tracks: [],
                artists : []
            }
        ])
    })

    // it('should handle SET ARTISTS', () => {
    //     const payload = [{
    //         name : "Rihana"
    //     }];

    //     expect(
    //     reducer([], {
    //         type: types.actionIds.SET_TOP_ARTISTS,
    //         payload
    //     })
    //     ).toEqual([
    //     {
    //         tracks: [],
    //         artists : payload
    //     }
    //     ])
    // })
})