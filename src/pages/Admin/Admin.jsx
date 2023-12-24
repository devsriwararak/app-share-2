import React, { useEffect } from 'react'
import { AuthData } from '../../auth/AuthWrapper'

const Admin = () => {
  const {user} = AuthData()

  return (
    <div>( ADMIN PAGE : {user.name} )</div>
  )
}

export default Admin