// AdminRoute.jsx
// Import necessary modules
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

// AdminRoute FUNCTION
const AdminRoute = () => {
    const { userInfo } = useSelector(state => state.auth);
    return userInfo && userInfo.isAdmin ? <Outlet />: <Navigate to='/signin' replace />
}

export default AdminRoute