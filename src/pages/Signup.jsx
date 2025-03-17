import React from 'react';
import { Signup as SignupComponent } from '../components';

function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create an Account</h2>
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;
