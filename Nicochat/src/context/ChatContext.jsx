import { createContext, useContext } from "react";
import { addChatRequest, deleteChatRequest, getAllChatFilesRequest, getChatRequest, searchByUsername, updateChatRequest } from "../api/chat.js"


export const ChatConext = createContext();

export const useChat = ()=>{
    const context = useContext(ChatConext)
    if(!context) throw Error ("there is not a chat context")
    return context;
}

export const ChatProvider =({children})=>{

    const getChats = async()=>{
        const chats = (await getChatRequest()).data
        if(chats) return chats[0].contacts

        return []
    }
    const getAllChatFiles = async(id)=>{
        return (await getAllChatFilesRequest(id)).data;
    }
    const search = async (username)=>{
        const resul = await searchByUsername(username.toLocaleLowerCase());
        const chat = (resul).data
        const result = []
        chat.forEach(user => {
            if(!user.contacts) {
                if(user._id) {
                    result.push({username: user.username, id: user._id, picture: user.picture})
                }           
            }else{
                result.push(...user.contacts)
            }
        });
        if(result.length>0) return result

        return result
    }
    const addChat= async(chat)=>{
        return (await addChatRequest(chat)).data

    }
    const editChat= async(chat)=>{
        const updated = await updateChatRequest(chat);
        return updated;
    }
    const deleteChat= async(id)=>{
       await deleteChatRequest(id)

    }
    return (
        <ChatConext.Provider value={
            {
                getChats,
                search,
                addChat,
                deleteChat,
                editChat,
                getAllChatFiles,
            }
        }>
            {children}
        </ChatConext.Provider>


    )

}
