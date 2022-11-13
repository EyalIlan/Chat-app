import {createSlice} from '@reduxjs/toolkit'
import {UserIF} from '../../interface/interface'
import {RootState} from '../store'
interface initalStateTyep{

    value:UserIF
    token:string | null
}

const initalState:initalStateTyep = {
    value:{
        name:'',
        email:'',
        age:0,
        avatar:null
    },
    token: null
}

const userSlice = createSlice({
    name:'user',
    initialState:initalState,
    reducers:{
        saveUser:(state,action)=>{
            state.value = action.payload
        },
        saveToken:(state,action) =>{
            state.token = action.payload
        }
    }   
})


export const {saveUser,saveToken} = userSlice.actions

export const UserData = (state:RootState) => state.user.value
export const Token = (state:RootState) => state.user.token

export default userSlice