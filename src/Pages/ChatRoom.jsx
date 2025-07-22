import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import config from "../Config/Config";
import { databases, id } from "../Config/AppwriteConfig";
import { Query } from "appwrite";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  // to list all the messages
  const getMessages = async () => {
    let response = await databases.listDocuments(
      config.AppWriteDatabaseId,
      config.AppWriteCollectionID,
      [Query.orderAsc("$updatedAt")]
    );
    console.log(response.documents);

    setMessages(response.documents);
  };

  // to create a document(message)
  const HandleSubmit = async (e) => {
    e.preventDefault();
    let response = await databases.createDocument(
      config.AppWriteDatabaseId,
      config.AppWriteCollectionID,
      id.unique(),
      { body: messageBody }
    );
    console.log(response);
    setMessages([...messages, response]);
    setMessageBody("");
  };

  // Delete Message
  const HandleDelete = async(message_id) =>{
    let response = await databases.deleteDocument(config.AppWriteDatabaseId,config.AppWriteCollectionID,message_id)
    console.log(response)
    setMessages(messages.filter(message=>message.$id !== message_id))
  }

  return (
    <>
      <div className="chat-room w-[50%] h-screen flex flex-col justify-start overflow-y-scroll">
        <div className="w-full h-full flex flex-col justify-start "> 
          {messages.map((message) => (
          <div key={message.$id} className="w-full message my-4 p-4 flex justify-between items-center">
            <div>
              <p className="w-fit bg-rose-600 text-white font-semibold text-2xl py-3 px-4 rounded-xl">
                {message.body}
              </p>
              <p className="text-gray-600 text-right">
                {new Date(message.$updatedAt).toLocaleString()}
              </p>
            </div>
            <button  onClick={()=>HandleDelete(message.$id)} className="bg-none text-xl text-white hover:text-red-600">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        </div>
        <form
          className="message-ip sticky bottom-0 bg-slate-900 px-5 py-5 w-full flex justify-between items-center text-white rounded-2xl text-xl"
          onSubmit={(e) => HandleSubmit(e)}
        >
          <input
            type="text"
            placeholder="Enter the message"
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            className="bg-transparent border-none focus:outline-none "
          />
          <button>
            <FontAwesomeIcon icon={faShareFromSquare} />
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatRoom;
