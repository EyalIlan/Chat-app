import {createSlice} from '@reduxjs/toolkit'
import {UserIF} from '../../interface/interface'
import {RootState} from '../store'
interface initalStateTyep{

    value:UserIF
    token:string | null
}

const initalState:initalStateTyep = {
    value:{
        _id:'',
        name:'',
        email:'',
        age:0,
        image:''
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