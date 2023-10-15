import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import {useDispatch} from 'react-redux'
import authService  from '../Appwrite/auth_service'
import {useForm} from 'react-hook-form'

function login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit}=useForm()
    const [error,setError]=useState('')

    const login = async(data)=>{
          setError('')
          try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
          } catch (error) {
            setError(error.message)
          }
    }
  
  return (
    <div  className='flex item-center jusify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className='mb-2 flex justify-center'><span className='inline-block w-full max-w-[100px]'><Logo width="100%"></Logo></span></div>
        </div>
    </div>
  )
}

export default login
