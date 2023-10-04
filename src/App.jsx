import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./Appwrite/auth_service"
import { login, logout } from "./store/authSlice"
import {Footer, Header} from './components/index.js'

function App() {
 const[loading,setLoading]= useState(true)
 const dispatch= useDispatch()
 useEffect(()=>{
authService.getCurrentUser()
.then((userData)=>{
  if(userData){
    dispatch(login({userData}))
  }else{
    dispatch(logout())
  }
})
.finally(()=>setLoading(false) )
 },[])

  return !loading ?(<div>test file
    <div>
    <Header/>
    <Footer/>
    </div>

  </div>):null
}

export default App
