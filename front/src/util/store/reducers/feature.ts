import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'


interface InitialState{
    Showmenu:boolean
    sidemenuType:string
}

const initialState:InitialState ={

    Showmenu:false,
    sidemenuType:''
}


const FeatureSlice = createSlice({
    name:'feature',
    initialState:initialState,
    reducers:{

        SidemenuChange:(state) =>{
            
            state.Showmenu = !state.Showmenu

        },

        SidemenuType:(state,action) =>{
            state.sidemenuType = action.payload
        }
    }
})

export const {SidemenuChange,SidemenuType} = FeatureSlice.actions

export const Showmenu = (state:RootState) => state.feature.Showmenu
export const sideMenuType = (state:RootState) => state.feature.sidemenuType

export default FeatureSlice