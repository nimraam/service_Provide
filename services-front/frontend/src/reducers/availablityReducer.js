import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const  Get_Appointment =createAsyncThunk('GET_availability',async(data)=>{
   const {email}=data
    const res=await fetch(`/availabilitiesemail/${email}`)
    return await res.json()
})
export const delete_available=createAsyncThunk('delete_available',async(data)=>{
    const {email,date}=data
    const res=await fetch(`/deleteavailabilities/${email}`,{
        method:'put',
        headers:{
            'Accept': 'application/json',
          "content-type":"application/json"},
          body:JSON.stringify({date:`${date.replace(/-/g,'/')}Z`})}
      )
})
export const add_available=createAsyncThunk('add_available',async(data)=>{
    const {email,date}=data
    const res=await fetch(`/updateavailabilities/${email}`,{
        method:'put',
        headers:{
            'Accept': 'application/json',
          "content-type":"application/json"},
          body:JSON.stringify({date})}
      )
      return await res.json()
})


const AvailabilitySlice=createSlice({
    name:"AvailabilitySlice",
    initialState:{
        Availability_by_email:[],
        loading:false,
        message:'',
        add_after_availability:{}
    },
    reducers:{},
    extraReducers:{
[Get_Appointment.fulfilled]:(state,action)=>{
    state.Availability_by_email=action.payload
    state.loading=false
},
[Get_Appointment.pending]:(state,action)=>{
 state.loading=true
},
[delete_available.fulfilled]:(state,action)=>{
    state.message=action.payload
    state.loading=false
},
[delete_available.pending]:(state,action)=>{
    state.loading=true
},
[add_available.fulfilled]:(state,action)=>{
    state.add_after_availability=action.payload
    state.loading=false
},
[add_available.pending]:(state,action)=>{
    state.loading=true

}
    }
})
export default AvailabilitySlice.reducer