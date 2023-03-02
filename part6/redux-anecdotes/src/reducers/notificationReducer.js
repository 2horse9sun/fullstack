import { createSlice } from '@reduxjs/toolkit'

const initialState = ""

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationState(state, action){
            return action.payload
        },
        hideNotification(){
            return ""
        }
    }
})

let timeoutId = null;

export const setNotification = (content, time) => {
    return async dispatch => {
        clearTimeout(timeoutId)
        dispatch(setNotificationState(content))
        timeoutId = setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000)
    }
}

export const { setNotificationState, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer