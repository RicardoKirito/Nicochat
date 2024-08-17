import { createContext, useContext, useState } from "react";
import { chatMessagesRequest, deleteMessageRequest, editMessageRequest, getFileRequest } from "../api/message";


export const MessageContext = createContext();

export const useMessage = () => {
    const context = useContext(MessageContext);
    if(!context) throw Error("there is not context")
    return context;
}

export const MessageProvider = ({children})=>{
    const [filesPath, setFilesPath] = useState('');

    const getMessages = async (id)=>{
        return await chatMessagesRequest(id)      
    }
    const getFile = async ()=>{
        const filespath = await getFileRequest;
        setFilesPath(filespath)
        return filespath;
    }
    const deleteMessage = async (id)=>{
        await deleteMessageRequest(id);
    }
    const editMessage = async(id, changes)=>{
        await editMessageRequest(id, changes)

    }
    return (
        <MessageContext.Provider value={
            {
                getMessages,
                getFile,
                deleteMessage,
                editMessage,
                filesPath,
            }
        }>
            {children}
        </MessageContext.Provider>
    )

}