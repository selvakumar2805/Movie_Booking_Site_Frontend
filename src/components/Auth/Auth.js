import React from 'react'
import AuthForm from './AuthForm'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'
import { useNavigate } from 'react-router-dom'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers'

const Auth = () => {
  const dispath = useDispatch()
  const navigate = useNavigate()


  const onResReceived = (data) => {
    console.log("Auth", data)
    dispath(userActions.login())
    localStorage.setItem("userId", data.id)
    localStorage.setItem("token", data.token)
    navigate("/")
  }

  const getData = (data) => {
    console.log(data)
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch(err => console.log(err))
  }


  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  )
}

export default Auth