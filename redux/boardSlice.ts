import { createSlice } from "@reduxjs/toolkit";
import data from "../src/data.json"

export const boardSlice =  createSlice({
    name: "boards",
    initialState: data.boards,
    reducers: {
        // will add on
    }
})