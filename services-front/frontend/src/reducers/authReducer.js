import {createAsyncThunk,createSlice}  from '@reduxjs/toolkit'
export const login=createAsyncThunk('login',async(data)=>{
    const res=await fetch(`/login`,{
        method:'post',
        headers:{
          "content-type":"application/json"},
          body:JSON.stringify(data)}
      )
      return await res.json()
})
export const Register=createAsyncThunk('register',async(data)=>{
    const res=await fetch(`/register`,{
        method:'post',
        headers:{
          "content-type":"application/json"},
          body:JSON.stringify(data)}
      )
      return await res.json()
})

const initialState={
    token:localStorage.getItem('token')?localStorage.getItem('token'):null,
    email:localStorage.getItem('email')?localStorage.getItem('email'):null,
    role_id:localStorage.getItem('role_id')?localStorage.getItem('role_id'):null,
    message:null,
    Error:null,
    loading:false,
    isRegister:false,
    isAuth:localStorage.getItem('isAuth')?Boolean(localStorage.getItem('token')):null,
}
const authSlice =createSlice({
    name:"authSlice",
    initialState:initialState,
    reducers:{
        clearError:(state,action)=>{
            state.Error=null
        },
        logout:(state,action)=>{
            localStorage.clear()
            state.isAuth=false
            state.role_id=null
            state.token=null
            state.email=null   
        }
    },
    extraReducers:{
        [login.fulfilled]:(state,action)=>{
            if(action.payload.Error){
                state.Error=action.payload.Error
            }else if(action.payload.tokens){
                state.token=action.payload.tokens
                state.email=action.payload.emailu
                state.role_id=action.payload.role_id
                state.Message=action.payload.Message
                state.isAuth=true
                localStorage.setItem('token',action.payload.tokens)
                localStorage.setItem('role_id',action.payload.role_id)
                localStorage.setItem('email',action.payload.emailu)
                localStorage.setItem('isAuth',true)


            }
            state.loading=false
        },
        [login.pending]:(state,action)=>{
            state.loading=true
        },
        [Register.fulfilled]:(state,action)=>{
            state.loading=false
            if(action.payload.Error){
                state.Error=action.payload.Error
            }else{
                state.isRegister=true
            }
            // else if(action.payload.message){
            //     state.message=action.payload.message
            // }
        },
        [Register.pending]:(state,action)=>{
            state.loading=true
        }
    }

})
export default authSlice.reducer
export const {clearError,logout} =authSlice.actions