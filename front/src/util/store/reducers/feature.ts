import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'


interface InitialState{
    Showmenu:boolean
    sidemenuType:string
    showModal:boolean
}

const initialState:InitialState ={

    Showmenu:false,
    sidemenuType:'',
    showModal:false
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
        },

        ChangeModalShowing:(state,action) =>{
            state.showModal = action.payload
        }

    }
})

export const {SidemenuChange,SidemenuType,ChangeModalShowing} = FeatureSlice.actions

export const Showmenu = (state:RootState) => state.feature.Showmenu
export const sideMenuType = (state:RootState) => state.feature.sidemenuType
export const showModal = (state:RootState) => state.feature.showModal

export default FeatureSlice