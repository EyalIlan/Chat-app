import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'
import {MessageIF,UserIF} from '../../interface/interface'

interface initalStateTyep{

    roomInfo:{
        name:string,
        image:string,
        owner:string
    }
    RoomMessages:MessageIF[]
    RoomUsers:UserIF[]
}


const initalState:initalStateTyep = {
    roomInfo:{
        name:'',
        image:'',
        owner:''
    },
    RoomMessages:[],
    RoomUsers:[]
}


const RoomSlice = createSlice({
    name:'room',
    initialState:initalState,
    reducers:{
        
        saveRoomInfo:(state,action) =>{
            state.roomInfo = action.payload
        },

        saveRoomUsers:(state,action)=>{
            state.RoomUsers = action.payload
        },
        saveRoomNewUser:(state,aciton) =>{
            state.RoomUsers.push(aciton.payload)
        },
        removeRoomUser:(state,aciton) =>{

            state.RoomUsers = state.RoomUsers.filter(p =>{
                return p._id !== aciton.payload._id
            })  
        },

        saveMRoomessages:(state,action) =>{
            state.RoomMessages = action.payload
        },
        saveNewRoomMessage:(state,action) =>{
            state.RoomMessages.push(action.payload)

        }


    }
})

export const {saveRoomUsers,saveRoomNewUser,removeRoomUser,saveMRoomessages,saveNewRoomMessage}  = RoomSlice.actions

export const RoomInfo = (state:RootState) => state.room.roomInfo
export const RoomUsers = (state:RootState) => state.room.RoomUsers
export const RoomMessages = (state:RootState) => state.room.RoomMessages

export default RoomSlice