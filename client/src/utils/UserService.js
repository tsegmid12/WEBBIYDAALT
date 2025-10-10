import { fetchData } from './fetchData';

const BASE_URL = "https://todu.mn/bs/lms/v1";

export const getToken = () => localStorage.getItem('access_token')

export const resetPassword = (resetPasswordDTO) =>
  fetchData(`${BASE_URL}/public/password`, 'PUT', resetPasswordDTO)

export const forgotPassword = (forgotPasswordDTO) =>
  fetchData(`${BASE_URL}/public/password`, 'POST', forgotPasswordDTO)

export const load = async () =>
  fetchData(`${BASE_URL}/users/me`, 'GET', undefined, true)

export const register = (registerDTO) =>
  fetchData(`${BASE_URL}/public/profile`, 'POST', registerDTO)

export const updateProfile = async (registerDTO) =>
  fetchData(`${BASE_URL}/v2/user`, 'PUT', registerDTO, true)

export const sendEmailOTP = (email) =>
  fetchData(`${BASE_URL}/v2/otp/email`, 'POST', { email })

export const sendPhoneOTP = (phone) =>
  fetchData(`${BASE_URL}/v2/otp/phone`, 'POST', { phone })

export const logIn = (loginDTO) =>
  fetch(`${BASE_URL}/token/email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDTO)
    }
  )

export const logOut = () =>
  fetch(`${BASE_URL}/public/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{}'
    }
  )

export const logInOtpPhone = (loginDTO) =>
  fetch(`${BASE_URL}/v2/otp/phone/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDTO)
    }
  )

export const logInOtpEmail = (loginDTO) =>
  fetch(`${BASE_URL}/v2/otp/email/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDTO)
    }
  )