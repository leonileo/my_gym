import { CLIENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const clientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        dashboard: builder.query({
            query: () => ({
                url: CLIENT_URL
            })
        }),
        getWorkout: builder.query({
            query: () => ({
                url: `${CLIENT_URL}/workout`
            })
        }),
        updateWorkout: builder.mutation({
            query: (data) => ({
                url: `${CLIENT_URL}/workout/${data.workoutId}`,
                method: 'PUT',
                body: data
            })
        }),
        getChats: builder.query({
            query: () => ({
                url: `${CLIENT_URL}/chat`
            })
        }),
        getSpecificChat: builder.query({
            query: (chatID) => ({
                url: `${CLIENT_URL}/chat/${chatID}`
            })
        }),
        addChat: builder.query({
            query: (text) => ({
                url: `${CLIENT_URL}/chat/${text.chatID}`,
                method: 'POST',
                body: text
            })
        }),
        getProfile: builder.query({
            query: () => ({
                url: `${CLIENT_URL}/profile`
            })
        }),
        updateProfile: builder.query({
            query: (data) => ({
                url: `${CLIENT_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        addTrainer: builder.mutation({
            query: (data) => ({
                url: `${CLIENT_URL}/addTrainer`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useDashboardQuery,
    useGetWorkoutQuery,
    useUpdateWorkoutMutation,
    useGetChatsQuery,
    useGetSpecificChatQuery,
    useAddChatQuery,
    useGetProfileQuery,
    useUpdateProfileQuery,
    useAddTrainerMutation
} = clientApiSlice;