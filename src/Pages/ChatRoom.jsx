import React,{useState,useEffect} from 'react'
import config from '../Config/Config'
import { databases } from '../Config/AppwriteConfig'

function ChatRoom() {


  const [messages,setMessages] = useState([])

  useEffect(()=>{
    getMessages()
  },[])

  const getMessages = async()=>{
    let response = await databases.listDocuments(config.AppWriteDatabaseId,config.AppWriteCollectionID);
    console.log(response.documents);
    
    setMessages(response.documents)
  }
  
  return (
    <div>
        {
            messages.map((message)=>(
                <p key={message.$id}>{message.body }</p>
            ))
        }
    </div>
  )
}

export default ChatRoom