import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {registerService} from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initalState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// register
export const register = createAsyncThunk('auth/register', async (user, ThunkAPI) => {
    try {
        return await registerService(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return ThunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initalState: initalState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: () => {}
})

export const {reset} = authSlice.actions
export default authSlice.reducer