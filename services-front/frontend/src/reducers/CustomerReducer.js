import { createAsyncThunk,createSlice}from '@reduxjs/toolkit'

export const GetCustomer=createAsyncThunk('get_customer',async()=>{
    const response=await fetch('/customers')
    return await response.json()
})
export const GetCustomerby_Email=createAsyncThunk('get_Cutomer_email',async(data)=>{
    const {email}=data
    const res=await fetch(`/userdetails/${email}`)
    return await res.json()
})
export const Delete_Customer=createAsyncThunk('delete_customer',async(data)=>{
    const {email}=data
    
    const res=await fetch(`/deletecustomer/${email}`,{
        method:'delete',
        headers:{
            'Accept': 'application/json',
          "content-type":"application/json"},
          body:JSON.stringify()
})
return await res.json()
})
export const Update_Customer=createAsyncThunk('update_customer',async(data)=>{
    const {email}=data
    const res=await fetch(`/updatecustomer/${email}`,{
        method:'put',
        headers:{
            'Accept': 'application/json',
          "content-type":"application/json"},
          body:JSON.stringify(data)}
      )
      return await res.json()
})
const initialState={
    Get_customer:[],
    loading:false,
    Get_customer_Email:{},
    delete_msg:'',
    update_msg:""
}

const CustomerSlice=createSlice({
    name:'customer',
    initialState:initialState,
    reducers:{},
    extraReducers:{
        [GetCustomer.fulfilled]:(state,action)=>{
            state.Get_customer=action.payload
            state.loading=false
        },
        [GetCustomer.pending]:(state,action)=>{
            state.loading=true
        },
        [GetCustomerby_Email.fulfilled]:(state,action)=>{
            state.loading=false
            state.Get_customer_Email=action.payload
        },
        [GetCustomerby_Email.pending]:(state,action)=>{
            state.loading=true
        },
        [Delete_Customer.fulfilled]:(state,action)=>{
            state.delete_msg=action.payload.message
            state.loading=false
        }
        ,
        [Delete_Customer.pending]:(state,action)=>{
            state.loading=true
        },
        [Update_Customer.fulfilled]:(state,action)=>{
            state.update_msg=action.payload
            state.loading=false
        },
        [Update_Customer.pending]:(state,action)=>{
            state.loading=true
        }
    }

})
export default CustomerSlice.reducer