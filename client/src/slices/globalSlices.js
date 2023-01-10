import { createSlice } from '@reduxjs/toolkit';

const session = localStorage.getItem('userSession')

export const globalSlices = createSlice({
    name: 'global',
    initialState: {
        isAuth: JSON.parse(session),
        user: null,
        userData: null,
        filter: {
            category: null,
            brandCountry: null,
            sort: null,
        },
        page: null
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload
        },
        addUserData: (state, action) => {
            state.userData = action.payload
        },
        editFilter: (state, action) => {
            state.filter = action.payload
        },
        addPage: (state, action) => {
            state.page = action.payload
        }
    }
})

export const { addUser, addUserData, editFilter, addPage } = globalSlices.actions;

export const selectAuth = (state) => state.global.isAuth;
export const selectUser = (state) => state.global.user;
export const selectUserData = (state) => state.global.userData;
export const selectFilter = (state) => ({
    category: state.global.filter.category,
    brandCountry: state.global.filter.brandCountry,
    sort: state.global.filter.sort,
});
export const selectPage = (state) => state.global.page;

export default globalSlices.reducer;