import React from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom'

const ProfilePage=()=> {
    const navigate=useNavigate();
    const {user,logout}=useAuthStore();
    const handleBack = () => {
		navigate("/");
	};
  return (
    <div className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
    >
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-600 text-transparent bg-clip-text'>
				MY PROFILE
			</h2>
            <div className='space-y-6'>
				<div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					>
					<h3 className='text-xl font-semibold text-blue-400 mb-3'>Profile Information</h3>
					<p className='text-gray-300'>Name: {user.username}</p>
					<p className='text-gray-300'>Email: {user.email}</p>
				</div>
				<div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					
				>
					<h3 className='text-xl font-semibold text-blue-400 mb-3'>Favorite Recipes</h3>
					
				</div>
                <div
				
				className='mt-4'
			>
				<button
					
					onClick={handleBack}
					className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900'
				>
					Back
				</button>
			</div>
			</div>
    </div>
  )
}

export default ProfilePage;