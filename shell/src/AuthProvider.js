import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'

const AuthProvider = ({ children }) => {
  return (
    <Auth0Provider
      domain='dev-w09bblwa.us.auth0.com'
      clientId='Do0ruQuhbmykN922yS1VG32Mra6GSoKo'
      redirectUri={'http://localhost:8000/en/bc'}
    >
      {children}
    </Auth0Provider>
  )
}

export default AuthProvider
