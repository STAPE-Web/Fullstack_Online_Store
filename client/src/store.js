import { configureStore } from "@reduxjs/toolkit";
import globalSlices from "slices/globalSlices";

export const store = configureStore({
    reducer: {
        global: globalSlices
    }
})