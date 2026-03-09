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
        addNewBill(state, action) {
            state.billList.push(action.payload);
        }
    }
})

const getBillList= ()=> {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:8888/ka");
        dispatch(setBillList(res.data));
    }
}

const addBillList = (new_bill) =>{
    return async (dispatch) => {
        // 这里应该有保存的逻辑，例如调用API接口将数据保存到服务器
        // 保存成功后，可以跳转回首页或者显示一个成功的提示
        const res = await axios.post("http://localhost:8888/ka", new_bill);
        dispatch(addNewBill(res.data));
    }
}


const { setBillList, addNewBill } = billStore.actions;
export { getBillList, addBillList };
const reducer = billStore.reducer;
export default reducer