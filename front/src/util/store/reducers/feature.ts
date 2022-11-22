import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'


interface InitialState{
    leftmenu:boolean
}

const initialState:InitialState ={

    leftmenu:false

}


const FeatureSlice = createSlice({
    name:'feature',
    initialState:initialState,
    reducers:{

        leftmenuChange:(state) =>{
            
            state.leftmenu = !state.leftmenu

        }

    }
})

export const {leftmenuChange} = FeatureSlice.actions

export const leftmenu = (state:RootState) => state.feature.leftmenu


export default FeatureSlice