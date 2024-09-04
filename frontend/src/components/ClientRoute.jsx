import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ClientRoute = () => {
    const { userInfo } = useSelector(state => state.auth);
    return userInfo && userInfo.isClient ? <Outlet />: <Navigate to='/signin' replace />
}

export default ClientRoute