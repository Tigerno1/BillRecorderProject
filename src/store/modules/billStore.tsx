import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const billStore = createSlice({
    name: "bill",
    initialState: {
        billList: [],
    },
    reducers: {
        //同步修改
        setBillList(state, action) {
            state.billList = action.payload;
        },
    }
})

const getBillList= ()=> {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:8888/ka");
        dispatch(setBillList(res.data));
    }
}


const { setBillList } = billStore.actions;
export { getBillList };
const reducer = billStore.reducer;
export default reducer