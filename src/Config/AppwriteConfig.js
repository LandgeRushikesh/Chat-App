import { Client,Databases,ID } from 'appwrite'
import config from './Config'

export const client = new Client()
    .setEndpoint(config.AppWriteUrl)
    .setProject(config.AppWriteProjectId)
    
export const databases = new Databases(client);

export const id = ID