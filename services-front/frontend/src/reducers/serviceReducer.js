import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
export const GetService=createAsyncThunk('get_service',async()=>{
    const response= await fetch('/services')
    return await response.json()
})
export const GetServiceProvider=createAsyncThunk('get_service_provider',async(data)=>{
    const {service,date}=data
    const res=await fetch(`/getproviders/${service}`,{
        method:'post',
        headers:{
          "content-type":"application/json"},
          body:JSON.stringify(data)}
      )
      return await res.json()
})
export const GetServiceByEmail=createAsyncThunk('get_service_email',async(data)=>{
    const {email}=data
    const respone =await fetch(`/providerdetails/${email}`)
    return await respone.json()
})

const initialState={
    serverData:[],
    loading:false,
    service_getbyname:[],
    Get_service_Email:{},
    Error:null,
    message:''
}
const ServiceSlice=createSlice({
    name:'serviceSlice',
    initialState:initialState,
    reducers:{},
    extraReducers:{
        [GetService.pending]:(state,action)=>{
           state.loading=true
        },
        [GetService.fulfilled]:(state,action)=>{
            state.serverData=action.payload
            state.loading=false
        },
        [GetServiceProvider.pending]:(state,action)=>{
            state.loading=true
        },
        [GetServiceProvider.fulfilled]:(state,action)=>{
            state.loading=false
            
            if(!action.payload.Message){
                state.service_getbyname=action.payload

            }
        },
        [GetServiceByEmail.fulfilled]:(state,action)=>{
            state.loading=false
            state.Get_service_Email=action.payload 
        },
        [GetServiceByEmail.pending]:(state,action)=>{
            state.loading=true

        }
    }
})
export default ServiceSlice.reducer