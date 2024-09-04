// PROJECT POWERD BY LABA CREATIVES
// index.css
// Import necessary modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store';
import './index.css';

// screens
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
// client
import ClientDashboard from './screens/Client/ClientDashboard';
import ClientWorkout from './screens/Client/ClientWorkout';
import ClientChat from './screens/Client/ClientChat';
import ClientProfilePage from './screens/Client/ClientProfilePage';
import ClientRoute from './components/ClientRoute';
// trainer
import TrainerDashboard from './screens/Trainer/TrainerDashboard'
import TrainerClients from './screens/Trainer/TrainerClients';
import TrainerService from './screens/Trainer/TrainerService';
import TrainerWorkout from './screens/Trainer/TrainerWorkout';
import TrainerChat from './screens/Trainer/TrainerChat';
import TrainerProfile from './screens/Trainer/TrainerProfile';
import TrainerRoute from './components/TrainerRoute';
// admin
import AdminDashboard from './screens/Admin/AdminDashboard'
import AdminClients from './screens/Admin/AdminClients'
import AdminTrainers from './screens/Admin/AdminTrainers'
import AdminChat from './screens/Admin/AdminChat'
import AdminProfile from './screens/Admin/AdminProfile'
import AdminRoute from './components/AdminRoute'

// screens

// Router function
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/signin' element={<SigninScreen />} />
      <Route path='/signup' element={<SignupScreen />} />
      <Route element={<ClientRoute />} >
        <Route path='/client/' element={<ClientDashboard />} />
        <Route path='/client/dashboard' element={<ClientDashboard />} />
        <Route path='/client/workout' element={<ClientWorkout />} />
        <Route path='/client/chat' element={<ClientChat />} />
        <Route path='/client/profile' element={<ClientProfilePage />} />
      </Route>
      <Route element={<TrainerRoute />}>
        <Route path='/trainer/' element={<TrainerDashboard />} />
        <Route path='/trainer/dashboard' element={<TrainerDashboard />} />
        <Route path='/trainer/my-clients' element={<TrainerClients />} />
        <Route path='/trainer/service-list' element={<TrainerService />} />
        <Route path='/trainer/workout' element={<TrainerWorkout />} />
        <Route path='/trainer/chat' element={<TrainerChat />} />
        <Route path='/trainer/profile' element={<TrainerProfile />} />
      </Route>
      <Route element={<AdminRoute />} >
        <Route path='/admin/' element={<AdminDashboard />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/clients' element={<AdminClients />} />
        <Route path='/admin/trainers' element={<AdminTrainers />} />
        <Route path='/admin/chat' element={<AdminChat />} />
        <Route path='/admin/profile' element={<AdminProfile />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


// PROJECT POWERD BY LABA CREATIVES