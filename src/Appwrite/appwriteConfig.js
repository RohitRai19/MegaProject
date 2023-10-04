import config from '../Config/Config'
import { Client,ID,Databases,Query,Storage } from "appwrite";

export  class Service{
    client = new Client()
    databases
    bucket;
    constructor() {
        this.client
        .setEndpoint(appwriteUrl) // Your API Endpoint
        .setProject(appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket= new Storage(this.client)

    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
             return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
             )
        } catch (error) {
            console.log("Appwrite service:: createPost::error",error)
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            
        } catch (error) {
            console.log("appwrite::updatePost::error",error)
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite::deletePost::error",error)
            return false
        }
    }

    async getPost(slug){
        try {
             return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
             ) 
        } catch (error) {
            console.log("Appwrite::getPost::error",error)
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
                    return await this.databases.listDocuments(
                        config.appwriteDatabaseId,
                        config.appwriteCollectionId,
                        queries
                    )    
                    return true
        
        } catch (error) {
            console.log("Appwrite::getPosts::error",error)
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteDatabaseId,
                ID.unique(),
                file    
            )
        } catch (error) {
            console.log("Appwrite::uploadfile::error",error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteDatabaseId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite::deleteFile::error",error)
            return false
        }
    }
    
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteDatabaseId,
            fileId
        )
    }
}


const service =new Service();
export default service