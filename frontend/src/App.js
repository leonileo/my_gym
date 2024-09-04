// App.js
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
        <main className='flex justify-center sm:min-h-[70vh]'>
            <div className='w-full'>
                <Outlet />
            </div>
        </main>
      <ToastContainer />
    </>
  );
}

export default App;
