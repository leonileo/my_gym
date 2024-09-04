import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const TrainerRoute = () => {
    const { userInfo } = useSelector(state => state.auth);
    return userInfo && userInfo.isTrainer ? <Outlet />: <Navigate to='/signin' replace />
}

export default TrainerRoute