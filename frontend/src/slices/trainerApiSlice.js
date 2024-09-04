import { TRAINER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const trainerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        dashboard: builder.query({
            query: () => ({
                url: `${TRAINER_URL}`
            })
        }),
        getClients: builder.query({
            query: () => ({
                url: `${TRAINER_URL}/my-clients`
            })
        }),
        getService: builder.query({
            query: () => ({
                url: `${TRAINER_URL}/service-list`
            })
        }),
        getWorkout: builder.query({
            query: () => ({
                url: `${TRAINER_URL}/workout`
            })
        }),
        createWorkout: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/workout`,
                method: 'POST',
                body: data
            })
        }),
        updateWorkout: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/workout`,
                method: 'PUT',
                body: data
            })
        }),
        getSpecificWorkout: builder.query({
            query: (workoutId) => ({
                url: `${TRAINER_URL}/workout/${workoutId}`
            })
        }),
        deleteWorkout: builder.mutation({
            query: (workoutId) => ({
                url: `${TRAINER_URL}/workout/${workoutId}`,
                method: 'DELETE',
            })
        }),
        getClientRequest: builder.query({
            query: () => ({
                url: `${TRAINER_URL}/client-request`
            })
        }),
        updateClientRequest: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/client-request/${data.requestId}`,
                method: 'PUT',
                body: data
            })
        }),
        getChats : builder.query({
            query: () => ({
                url: `${TRAINER_URL}/chat`
            })
        }),
        getSpecificChat : builder.query({
            query: (data) => ({
                url: `${TRAINER_URL}/chat/${data.chatId}`
            })
        }),
        addChat: builder.query({
            query: (data) => ({
                url: `${TRAINER_URL}/chat/${data.chatId}`,
                method: 'POST',
                body: data
            })
        }),
        getProfile: builder.query({
            query: () => ({
                url: `${TRAINER_URL}/profile`
            })
        }),
        updateProfile: builder.query({
            query: (data) => ({
                url: `${TRAINER_URL}/profile`,
                method: 'PUT',
                body: data
            })
        })
    })
})

export const {
    useDashboardQuery,
    useGetClientsQuery,
    useGetServiceQuery,
    useGetWorkoutQuery,
    useCreateWorkoutMutation,
    useUpdateWorkoutMutation,
    useGetSpecificWorkoutQuery,
    useDeleteWorkoutMutation,
    useGetClientRequestQuery,
    useUpdateClientRequestMutation,
    useGetChatsQuery,
    useGetSpecificChatQuery,
    useAddChatQuery,
    useGetProfileQuery,
    useUpdateProfileQuery
} = trainerApiSlice;