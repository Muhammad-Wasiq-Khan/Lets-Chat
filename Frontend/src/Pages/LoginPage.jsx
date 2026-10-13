import React, { useState } from 'react'
import { useAuthStore } from "../Store/useAuthStore.js";
import { LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { LoaderIcon } from 'react-hot-toast';
import { Link } from "react-router";
function LoginPage() {
  const [formData, setFormData] = useState({  email: "", password: "" })
  const { login, isLoggingIn } = useAuthStore()
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
  }
  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className='relative w-full max-w-6xl '>
        {/* <div className='w-full flex flex-col md:flex-row'> */}
        <div className='md-w-1/2  flex items-center justify-center  border-slate-600/30'>
          <div className='w-full max-w-md'>
            <div className='text-center mb-8'>
              <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4 " />
              <h2 className='text-2l font-bold text-slate-200 mb-2 '>Welcome Back</h2>
              <p className='text-slate-400'>Log In to an existing account</p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label className='auth-input-label'>Email</label>
                <div className='relative'>
                  <MailIcon className='auth-input-icon' />

                  <input type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className='input'
                    placeholder='johndoe@example.com'
                  />
                </div>
              </div>
              <div>
                <label className='auth-input-label'>Password</label>
                <div className='relative'>
                  <LockIcon className='auth-input-icon' />

                  <input type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className='input'
                    placeholder='Enter a strong password'
                  />
                </div>
              </div>
              <button className='auth-btn' disabled={isLoggingIn} type='submit'>
                {isLoggingIn ? (
                  <LoaderIcon className='w-full h-5 animate-spin text-center' />
                ) : ("Log In")}
              </button>
              <div className='mt-6 text-center'>
                <Link to="/SignUp" className='auth-link'>
                  Don't have an account? Sign Up
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
    // </div>
  )
}

export default LoginPage







