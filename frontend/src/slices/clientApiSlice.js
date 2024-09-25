import { CLIENT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const clientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        dashboard: builder.query({
            query: () => ({
                url: `${CLIENT_URL}/dashboard`
            })
        }),
        getWorkout: builder.query({
            query: () => ({
                url: `${CLIENT_URL}/workout`
            })
        }),
        getProgress: builder.mutation({
            query: (data) => ({
                url: `${CLIENT_URL}/progress`,
                method: 'POST',
                body: data
            })
        }),
        updateWorkout: builder.mutation({
            query: (data) => ({
                url: `${CLIENT_URL}/workout/`,
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
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${CLIENT_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        addTrainer: builder.mutation({
            query: (data) => ({
                url: `${CLIENT_URL}/add-trainer`,
                method: 'POST',
                body: data
            })
        }),
        removeTrainer: builder.mutation({
            query: (data) => ({
                url: `${CLIENT_URL}/remove-trainer`,
                method: 'PUT',
                body: data
            })
        }),
        uploadClientImage: builder.mutation({
            query: (data) => ({
                url: `/apiv1/upload`,
                method: 'POST',
                body: data
            })
        }),
        uploadWeightPicture: builder.mutation({
            query: (data) => ({
                url: `/apiv1/upload/weight-picture`,
                method: 'POST',
                body: data
            })
        }),
        uploadClientPicture: builder.mutation({
            query: (data) => ({
                url: `/apiv1/upload/client-picture`,
                method: 'POST',
                body: data
            })
        }),
        updateWeightInfo: builder.mutation({
            query: (data) => ({
                url: `${CLIENT_URL}/update-weight-info`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const {
    useDashboardQuery,
    useGetProgressMutation,
    useGetWorkoutQuery,
    useUpdateWorkoutMutation,
    useGetChatsQuery,
    useGetSpecificChatQuery,
    useAddChatQuery,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useAddTrainerMutation,
    useRemoveTrainerMutation,
    useUploadClientImageMutation,
    useUploadClientPictureMutation,
    useUploadWeightPictureMutation,
    useUpdateWeightInfoMutation
} = clientApiSlice;