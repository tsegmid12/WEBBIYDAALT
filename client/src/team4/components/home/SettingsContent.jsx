import React, { useState } from 'react';
import { Upload, Eye, EyeOff, SaveOff, Save } from 'lucide-react';

export default function SettingsContent() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <h2 className='text-2xl font-bold text-gray-800 mb-8'>
        Account settings
      </h2>

      <div className='grid grid-cols-2 gap-12'>
        <div>
          <label className='block text-sm text-gray-700 mb-2'>
            Your nick name
          </label>
          <div className='relative mb-8'>
            <input
              type={'text'}
              placeholder='Uuganaa'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg'
            />
            <button
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
              <p className=''>Save</p>
            </button>
          </div>
          <div className='bg-white p-6 shadow-sm'>
            <div className='relative w-48 h-48 mx-auto mb-4'>
              <img
                src='/team4/student/uploadPhoto.png'
                alt='Profile'
                className='w-full h-full '
              />
              <button className='absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 text-white py-2  flex items-center justify-center gap-2 hover:bg-opacity-90'>
                <Upload size={16} />
                <span className='text-sm'>Upload Photo</span>
              </button>
            </div>
            <p className='text-center text-sm text-gray-500'>
              Image size should be under 1MB and
              <br />
              image ration needs to be 1:1
            </p>
          </div>
        </div>

        {/* Change Password */}
        <div>
          <div className='bg-white rounded-xl p-6 shadow-sm'>
            <h3 className='text-xl font-semibold text-gray-800 mb-6'>
              Change password
            </h3>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm text-gray-700 mb-2'>
                  Current Password
                </label>
                <div className='relative'>
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder='Password'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                    {showCurrentPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className='block text-sm text-gray-700 mb-2'>
                  New Password
                </label>
                <div className='relative'>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder='Password'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className='block text-sm text-gray-700 mb-2'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm new password'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button className='w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium mt-4'>
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
