import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'


export const MakeAppointment=createAsyncThunk('makeAppointment',async(data)=>{
    const {user,pemail,date,instruction}=data
    
    const newdate=date.replace(/-/g,'/')
    // console.log(newdate)
    // console.log({pemail,date:date.replace(/-/g,'/'),instruction});
    const res=await fetch(`/makeappointment/${user}`,{
        method:'put',
        headers:{
            'Accept': 'application/json',
          "content-type":"application/json"},
          body:JSON.stringify({pemail,date:date.replace(/-/g,'/'),instruction})}
      )
      return await res.json()
})
export const Appointment_status= createAsyncThunk('Appointment_status', async (data)=>{
    const {email}=data
    const res=await fetch(`/updatestatus/${email}`,{
        method:'put',
        headers:{
            'Accept': 'application/json',
          "content-type":"application/json"},
          body:JSON.stringify(data)
        }
    )
    return await res.json()
    
})

export const Get_Appointment_By_Email=createAsyncThunk('get_appointment_ by_email',async(data)=>{
    const {email}=data
    const res=await fetch(`/appointmentemail/${email}`)
    return await (res.json())

})



const initialState={
    get_data:[],
    Error:null,
    message:'',
    loading:false
} 
const appointmentSlice=createSlice({
    name:'appointmentSlice',
    initialState:initialState,
    reducers:{
        ClearError:(state,action)=>{
            state.Error=null
        }
    },
    extraReducers:{
        [MakeAppointment.fulfilled]:(state,action)=>{
            state.loading=true
            if(action.payload.Error){
                state.Error=action.paylaod.Error
            }
            else if(action.payload.message) {
                state.message=action.payload.message
                
            }
        },
        [MakeAppointment.pending]:(state,action)=>{
            state.loading=false
        },
        [Get_Appointment_By_Email.pending]:(state,action)=>{
            state.loading=true
        },
        [Get_Appointment_By_Email.fulfilled]:(state,action)=>{
            state.get_data=action.paylaod
            state.get_data=[...action.payload]
        },
        [Appointment_status.fulfilled]:(state,action)=>{
            state.loading=false
            state.message=action.payload
        },
        [Appointment_status.pending]:(state,action)=>{
            state.loading=true
        }
    }
})
export default appointmentSlice.reducer
export const {ClearError}=appointmentSlice.actions
