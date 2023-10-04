import config from '../Config/Config'
import { Client, Account,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    
    constructor (){
        this.client
        .setEndpoint(appwriteUrl) // Your API Endpoint
        .setProject(appwriteProjectId)
        this.account= new Account(this.client) 
    }

    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account(ID.unique(),email,password,name);
            if(userAccount){
                    return this.login({email,password})
            }else{
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
              return await this.account.get();
        } catch (error) {
            console.log("App write service :getCurrentuser::error",error);
        }
        return null
    }

    async logOut(){
        try {

            return await this.account.deleteSessions();
        } catch (error) {
        console.log("App write service : logOut::error",error);   
        }
    }
}

const authService = new AuthService()

export default authService;