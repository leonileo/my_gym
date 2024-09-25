import { ADMIN_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Adashboard: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/dashboard`
            })
        }),
        getAllClients: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/clients`
            })
        }),
        getAllTrainers: builder.query({
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
        AgetProfile: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/profile`
            })
        }),
        AupdateProfile: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/profile/`,
                method: 'PUT',
                body: data
            })
        }),
        suspendClientAccount: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/suspend-client-account`,
                method: 'PUT',
                body: data
            })
        }),
        suspendTrainerAccount: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/suspend-trainer-account`,
                method: 'PUT',
                body: data
            })
        }),
        activateClientAccount: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/activate-client-account`,
                method: 'PUT',
                body: data
            })
        }),
        activateTrainerAccount: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/activate-trainer-account`,
                method: 'PUT',
                body: data
            })
        }),
        uploadAdminImage: builder.mutation({
            query: (data) => ({
                url: `/apiv1/upload`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useAdashboardQuery,
    useGetAllClientsQuery,
    useGetAllTrainersQuery,
    useGetChatQuery,
    useGetSpecificChatQuery,
    useAddChatMutation,
    useAgetProfileQuery,
    useAupdateProfileMutation,
    useSuspendClientAccountMutation,
    useSuspendTrainerAccountMutation,
    useActivateClientAccountMutation,
    useActivateTrainerAccountMutation,
    useUploadAdminImageMutation
} = adminApiSlice;