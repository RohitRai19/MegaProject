import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from "../../Appwrite/appwriteConfig";
import { Container } from '../index';
import PostForm from '../post-form/PostForm';

function EditPost() {
    const [post,setPost] = useState(null)
    const {slug}= useParams();
    const navigate = useNavigate()

    useEffect(()=>{ 
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post)
                }else{
                    useNavigate('/')
                }
            })
        }
    },[slug,navigate])
  return post ?(<div className='py-8'>
    <Container><PostForm post={post}/></Container>
  </div>):null
}

export default EditPost
