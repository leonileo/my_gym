import { ADMIN_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        dashboard: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/`
            })
        }),
        getClients: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/clients`
            })
        }),
        getTrainers: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/trainers`
            })
        }),
        getChat: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/chat`
            })
        }),
        getSpecificChat: builder.query({
            query: (chatId) => ({
                url: `${ADMIN_URL}/chat/${chatId}`
            })
        }),
        addChat: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/chat/${data.chatId}`,
                method: 'POST',
                body: data
            })
        }),
        getProfile: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/profile`
            })
        }),
        updateProfile: builder.query({
            query: (data) => ({
                url: `${ADMIN_URL}/profile/`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const {
    useDashboardQuery,
    useGetClientsQuery,
    useGetTrainersQuery,
    useGetChatQuery,
    useGetSpecificChatQuery,
    useAddChatMutation,
    useGetProfileQuery,
    useUpdateProfileQuery
} = adminApiSlice;