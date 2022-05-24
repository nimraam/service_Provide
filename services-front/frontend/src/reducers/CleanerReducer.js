import {createAsyncThunk,createSlice}from '@reduxjs/toolkit'

export const getServiceProvider=createAsyncThunk('ServiceProvider',async()=>{
    const res=await fetch('/getServiceProvider')
    return await res.json()
})
export const Update_provider=createAsyncThunk('update_provider',async(data)=>{
    const {email}=data
    const res=await fetch(`/updateprovider/${email}`,{
        method:'put',
        headers:{
            'Accept': 'application/json',
          "content-type":"application/json"},
          body:JSON.stringify(data)}
      )
      return await res.json()
})
export const Delete_cleaner=createAsyncThunk('delete_cleaner',async(data)=>{
    const {email}=data
    const res=await fetch(`/deleteprovider/${email}`,{
        method:'delete',
        headers:{
            'Accept': 'application/json',
          "content-type":"application/json"},
          body:JSON.stringify()
})
return await res.json()
})


const initialState={
    get_service_provider:[],
    loading:false,
    delete_msg:'',
    message:""

}

const CleanerSlice= createSlice({
    name:'CleanerSlice',
    initialState:initialState,
    reducers:{},
    extraReducers:{
[getServiceProvider.fulfilled]:(state,action)=>{
    state.get_service_provider=action.payload
    state.loading=false
},
[getServiceProvider.pending]:(state,action)=>{
    state.loading=true
},
[Delete_cleaner.fulfilled]:(state,action)=>{
    state.delete_msg=action.payload.message
    state.loading=false
},
[Delete_cleaner.pending]:(state,action)=>{
    state.loading=true
},
[Update_provider.fulfilled]:(state,action)=>{
state.message=action.payload
state.loading=false
},
[Update_provider.pending]:(state,action)=>{
    state.loading=true

}
    }
})
export default CleanerSlice.reducer