import { TRAINER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const trainerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Tdashboard: builder.query({
            query: () => ({
                url: `${TRAINER_URL}/dashboard`
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
        TgetWorkout: builder.query({
            query: () => ({
                url: `${TRAINER_URL}/workout`
            })
        }),
        createService: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/service-list`,
                method: "POST",
                body: data
            })
        }),
        updateService: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/service-list/${data.serviceId}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteService: builder.mutation({
            query: (serviceId) => ({
                url: `${TRAINER_URL}/service-list/${serviceId}`,
                method: "DELETE"
            })
        }),
        createWorkout: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/workout`,
                method: 'POST',
                body: data
            })
        }),
        tupdateWorkout: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/workout/${data.workoutId}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteWorkout: builder.mutation({
            query: (workoutId) => ({
                url: `${TRAINER_URL}/workout/${workoutId}`,
                method: 'DELETE',
            })
        }),
        getClientProgress: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/client-progress`,
                method: 'POST',
                body: data
            })
        }),
        assignWorkout: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/assign-workout`,
                method: 'PUT',
                body: data
            })
        }),
        removeAssignedWorkout: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/remove-assigned-workout`,
                method: 'PUT',
                body: data
            })
        }),
        getClientRequest: builder.query({
            query: () => ({
                url: `${TRAINER_URL}/client-request`
            })
        }),
        updateClientRequest: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/client-request`,
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
        TgetProfile: builder.query({
            query: () => ({
                url: `${TRAINER_URL}/profile`
            })
        }),
        TupdateProfile: builder.mutation({
            query: (data) => ({
                url: `${TRAINER_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        uploadTrainerImage: builder.mutation({
            query: (data) => ({
                url: `/apiv1/upload`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useTdashboardQuery,
    useGetClientsQuery,
    useGetServiceQuery,
    useTgetWorkoutQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    useCreateWorkoutMutation,
    useTupdateWorkoutMutation,
    useDeleteWorkoutMutation,
    useGetClientRequestQuery,
    useGetClientProgressMutation,
    useAssignWorkoutMutation,
    useRemoveAssignedWorkoutMutation,
    useUpdateClientRequestMutation,
    useGetChatsQuery,
    useGetSpecificChatQuery,
    useAddChatQuery,
    useTgetProfileQuery,
    useTupdateProfileMutation,
    useUploadTrainerImageMutation
} = trainerApiSlice;