import { AUTH_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/signin`,
                method: 'POST',
                body: data,
            }),
        }),
        signout: builder.mutation({
            query: () => ({ 
                url: `${AUTH_URL}/signout`,
                method: 'POST',
            })
        })
    })
})

export const {
    useSigninMutation,
    useSignoutMutation
} = authApiSlice;