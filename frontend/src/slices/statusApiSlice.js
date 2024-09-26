import { STATUS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const statusApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        status: builder.query({
            query: () => ({
                url: `${STATUS_URL}`,
            }),
        })
    })
})

export const {
    useStatusQuery
} = statusApiSlice;