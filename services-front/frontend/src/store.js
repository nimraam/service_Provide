import {configureStore}from '@reduxjs/toolkit'
import auth from './reducers/authReducer'
import serviceReducer from './reducers/serviceReducer'
import CustomerReducer from './reducers/CustomerReducer'
import appointment from './reducers/appointment'
import CleanerReducer from './reducers/CleanerReducer'
import availablityReducer from './reducers/availablityReducer' 

export const store =configureStore({
    reducer:{
        auth,
        serviceReducer,
        CustomerReducer,
        appointment,
        CleanerReducer,
        availablityReducer
    }
    
})