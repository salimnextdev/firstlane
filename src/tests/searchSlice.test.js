import { describe, it, expect } from 'vitest';
import { searchSlice, setSearchTerm } from '@/modules/auth/state/searchSlice';

const searchReducer = searchSlice.reducer;

describe('searchSlice', () => {

    it('should return the initial state', () => {
        expect(searchReducer(undefined, { type: 'unknown' })).toEqual({
            searchTerm: "",
        });
    });

    it('should handle setSearchTerm', () => {
        const initialState = {
            searchTerm: "",
        };
        const newSearchTerm = "test query";

        const action = setSearchTerm(newSearchTerm);
        const state = searchReducer(initialState, action);

        expect(state.searchTerm).toEqual(newSearchTerm);
    });

});