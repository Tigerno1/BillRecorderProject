import reducer from "./modules/billStore";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer: {
        bill: reducer,
    }
});
export default store;