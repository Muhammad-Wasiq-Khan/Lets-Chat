import React, { useState } from 'react'
import { useAuthStore } from "../Store/useAuthStore.js";
import { LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { LoaderIcon } from 'react-hot-toast';
import {  Link} from "react-router";
function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" })
  const { signUp, isSigningUp } = useAuthStore()
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formData)
  }
  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
      <div className='relative w-full max-w-6xl '>
        {/* <div className='w-full flex flex-col md:flex-row'> */}
          <div className='md-w-1/2  flex items-center justify-center  border-slate-600/30'>
            <div className='w-full max-w-md'>
              <div className='text-center mb-8'>
                <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4 " />
                <h2 className='text-2l font-bold text-slate-200 mb-2 '>Create Account</h2>
                <p className='text-slate-400'>Sign Up for a new account</p>
              </div>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label className='auth-input-label'>Full Name</label>
                  <div className='relative'>
                    <UserIcon className='auth-input-icon' />

                    <input type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className='input'
                      placeholder='John Doe'
                    />
                  </div>
                </div>
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
                <button className='auth-btn' disabled={isSigningUp} type='submit'>
                  {isSigningUp ? (
                    <LoaderIcon className='w-full h-5 animate-spin text-center' />
                  ) : ("Create Account")}
                </button>
                <div className='mt-6 text-center'>
                  <Link to="/Login" className='auth-link'>
                    Already have an account? Login
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

export default SignUpPage
